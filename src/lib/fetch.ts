import { useEffect, useLayoutEffect, useState } from "react"
import useUserStore from "../stores/user"
import { ENDPOINT } from "../config"

const cache: {
  [key: string]: {
    expiry: number,
    data: any
  }
} = {}

type OptionsType = {
  cache?: boolean,
  time?: number,
  refresh?: boolean
}

export const Fetch = async<T = any>(url: RequestInfo | URL, options?: RequestInit, optionsType?: OptionsType) : Promise<[ data: T | null, error: any]> => {
  const finalOptionsType: { cache: boolean, time: number, refresh: boolean } = { 
    cache: false, 
    time: 180000,
    refresh: true,
    ...optionsType
  }

  const cacheKey = typeof url === 'string' ? url : url.toString()

  const fetchWithToken = async () => await fetch(ENDPOINT + url, {
    ...options,
    headers: {
      // 'Content-Type': 'application/json',
      ...(!(options && options.body instanceof FormData) ? { 'Content-Type':  'application/json'} : {}),
      ...options?.headers,
      'Authorization': `Bearer ${useUserStore.getState().token}`
    }
  })
  
  try {
    let data: T | null = null

    if (finalOptionsType.cache && cache[cacheKey] )  {
      const cachedEntry = cache[cacheKey]

      if (Date.now() <= cachedEntry.expiry + finalOptionsType.time) {
        return [ cachedEntry.data , null]
      }
      else {
        delete cache[cacheKey]
      }
    }

    let response = await fetchWithToken()

    if (!response.ok) {
      if (response.status == 401 && finalOptionsType.refresh) {
        await useUserStore.getState().refresh()
    
        response = await fetchWithToken()

        if (!response.ok) throw response
      }
      else throw response
    }

    data = await response.json()

    if (finalOptionsType.cache) {
      cache[cacheKey] = {
        data,
        expiry: Date.now()
      };
    }
    
    return [ data as T, null ]
  } catch (error) {
    let errorValue = null

    if (error instanceof Error) {
      errorValue = error.message
    }
    else if (error instanceof Response) {
      const contentType = error.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        errorValue = await error.json();
      } else {
        errorValue = await error.text();
      }
    }
    return [ null, errorValue ]
  }
}

export const useFetch = <T = any>(url: RequestInfo | URL, options?: RequestInit, optionsType?: OptionsType) : { data: T | null, error: any, loading: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false)

  useLayoutEffect(() => {
    const fetchData = async () => {
      if (loading) return
      setLoading(true)

      const [data, error] = await Fetch<T>(url, options, optionsType)

      setData(data)
      setError(error);
      setLoading(false);
    };

    fetchData();

  }, [options, optionsType, url]);

  return { data, error, loading };
};

export const useFetchLoading = (callback: (args?: any) => void) => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) return
        setLoading(true)
        await callback()
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

  }, [callback]);

  return { error, loading };
};