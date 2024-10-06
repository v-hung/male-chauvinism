import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Container from '../Container';

type State = HTMLAttributes<HTMLDivElement>

const Footer: FC<State> = (props) => {
  const { className, ...rest } = props

  return (
    <div {...rest} className={twMerge('bg-zinc-800 text-white', className)}>
      <Container className='py-4 text-sm text-center'>
				© 2024. Copyright <a href="https://github.com/v-hung" className='hover:underline'>Việt Hùng</a>
      </Container>
    </div>
  )
}

export default Footer