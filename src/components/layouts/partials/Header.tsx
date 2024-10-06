import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type State = HTMLAttributes<HTMLDivElement>

const Header: FC<State> = (props) => {
	const { className, ...rest } = props

	return (
		<div {...rest} className={twMerge('bg-white z-30 border-b py-4 px-6 h-14', className)}>
			<h1 className="md:text-lg font-semibold">Trọng nam kinh nữ</h1>
		</div>
	)
}

export default Header