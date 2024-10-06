import { useEffect, useRef } from 'react'
import { useNavigation } from 'react-router-dom';

const ProgressIndicator = () => {
  const { state } = useNavigation();

  const lineProcess = useRef<HTMLDivElement>(null)

  const timer = useRef<undefined | ReturnType<typeof setTimeout>>()
  const timerEnd = useRef<undefined | ReturnType<typeof setTimeout>>()
  const isLoading = useRef(false)

  useEffect(() => {
    clearTimeout(timer.current)

    if (state != "loading") {
      clearTimeout(timerEnd.current)

      if (!lineProcess.current) return
      
      if (isLoading.current) {
        isLoading.current = false
        lineProcess.current.style.width = '100%'
        lineProcess.current.style.transition = 'all .1s'

        timerEnd.current = setTimeout(() => {
          if (!lineProcess.current) return
  
          lineProcess.current.style.width = '0'
          lineProcess.current.style.transition = ""
        }, 100);
      }
    }
    else {
      if (!lineProcess.current) return

      lineProcess.current.style.transition = ""
      lineProcess.current.style.width = '0'

      timer.current = setTimeout(() => {
        isLoading.current = true
        if (!lineProcess.current) return
          if (state == "loading") {
            // lineProcess.current.style.width = '0'
            lineProcess.current.style.transition = 'all 2s'
            lineProcess.current.style.width = '70%'
            // setTimeout(() => {
            // }, 0);
          }
      }, 500)
    }
  }, [state])

  return (
    <div className="fixed w-full h-0.5 top-0 left-0 z-50">
      <div ref={lineProcess} className="absolute w-0 h-full bg-orange-600 ease-in-out"></div>
    </div>
  )
}

export default ProgressIndicator