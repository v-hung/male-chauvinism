import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import "./Loading.css";

type State = HTMLAttributes<HTMLDivElement>

const Loading: FC<State> = (props) => {
  const { className, ...rest } = props
  return (
    <div {...rest} id='loading1' className={twMerge('', className)}>
      <div className="loader">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
      </div>
    </div>
  )
}

export default Loading