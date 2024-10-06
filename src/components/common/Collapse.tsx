import { FC, HTMLAttributes } from "react";
import { m, LazyMotion, domAnimation, AnimationProps } from "framer-motion";
import { twMerge } from "tailwind-merge";

type State = HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean,
  animate?: AnimationProps["animate"]
}

const Collapse: FC<State> = (props) => {
  const { 
    isOpen = true, 
    animate = {
      transition: { type: "tween", duration: .3 },
      height: isOpen ? "auto" : 0,
    },
    className,
    children,
   ...rest 
  } = props

  return (
    <LazyMotion features={domAnimation} strict>
      <div aria-expanded={isOpen} {...rest} className={twMerge('', className)}>
        <m.div
          style={{ overflow: "hidden" }}
          initial={{ height: isOpen ? "auto" : 0, opacity: 1 }}
          animate={animate}
          exit={{ height: 0, opacity: 1 }}
        >
          {children}
        </m.div>
      </div>
    </LazyMotion>
  );
};

export default Collapse;