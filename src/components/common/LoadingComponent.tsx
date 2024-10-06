import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

type State = HTMLAttributes<HTMLDivElement>

const LoadingComponent: FC<State> = (props) => {
	const { className, ...rest } = props

	const [dots, setDots] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setDots(prev => prev < 3 ? prev + 1 : 0)
		}, 500)

		return () => clearInterval(interval);
	}, []);

	return (
		<div {...rest} className={twMerge('rounded bg-white overflow-hidden', className)}>
			<div className="h-full flex justify-center items-center border-dashed-animation">
				<AiOutlineLoading3Quarters size={34} className="animate-spin text-primary-500 mr-3" />
				<span className="font-semibold">Đang tính toán&nbsp;</span>
				<span className={dots < 1 ? 'opacity-0' : ''}>.</span>
				<span className={dots < 2 ? 'opacity-0' : ''}>.</span>
				<span className={dots < 3 ? 'opacity-0' : ''}>.</span>
			</div>
		</div>
	)
}

export default LoadingComponent