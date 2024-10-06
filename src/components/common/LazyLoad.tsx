import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Container from '../layouts/Container'

type State = HTMLAttributes<HTMLDivElement>

const LazyLoad: FC<State> = (props) => {
  const { className, ...rest } = props
  return (
    <Container {...rest} className={twMerge('min-h-screen py-4', className)}>
      Đang tải...
    </Container>
  )
}

export default LazyLoad