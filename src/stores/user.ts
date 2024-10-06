import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'
import { Fetch } from "../lib/fetch"
import { ENDPOINT } from "../config"

export type User = {
  id: number,
  email: string,
  fullName?: string,
  phoneNumber?: string,
  emailConfirmed: boolean,
  address?: string,
  image?: string,
  createdAt: Date,
  updatedAt: Date
}

type State = {
  user: User | null,
  token: string | null
  refreshToken: string | null,
  isOpenModalLogin: boolean
}

type Actions = {
  logout: () => Promise<unknown>,
  logged: () => Promise<unknown>,
  refresh: () => Promise<unknown>,
}

const useUserStore = create(persist<State & Actions>((set, get) => ({
  user: null,
  token: null,
  refreshToken: null,
  isOpenModalLogin: false,

  logout: async () => {
    set({ user: null, token: null, refreshToken: null })

    await Fetch('/api/account/logout', {
      method: 'post'
    }, { refresh: false })
  },
  logged: async () => {
    const [data] = await Fetch('/api/account/current-user', {
      body: JSON.stringify({
        refreshToken: get().refreshToken
      })
    })

    set({
      user: data?.user || null
    })
  },
  
  refresh: async () => {
    const res = await fetch(ENDPOINT + '/api/account/refresh', {
      method: 'post',
      body: JSON.stringify({
        token: get().token,
        refreshToken: get().refreshToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) return

    const data = await res.json()

    set({
      token: data?.token ?? '',
      refreshToken: data?.refreshToken ?? ''
    })
  }
}), {
  name: 'user-storage',
  storage: createJSONStorage(() => localStorage),
}))

export default useUserStore