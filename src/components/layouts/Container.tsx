import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type State = HTMLAttributes<HTMLDivElement>

const Container: FC<State> = (props) => {
  const { className, children, ...rest } = props
  return (
    <div {...rest} className={twMerge('w-full max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}

export default Container