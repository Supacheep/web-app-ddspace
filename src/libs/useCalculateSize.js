import { useEffect, useRef, useState } from 'react'

const useCalculateSize = (
  // shouldNotResizeContainer
) => {
  const containerRef = useRef()
  const [eleHeight, setHeight] = useState()

  const onResize = () => {
    // const ua = navigator.userAgent.toLowerCase()
    // const isSafari = ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1

    const el = containerRef?.current
    if (el) {
      // if (!shouldNotResizeContainer && !isSafari) {
      //   if ((window.innerHeight * 1.77777777778) <= window.innerWidth) {
      //     containerRef.current.style.width = 'auto'
      //     containerRef.current.style.height = '100vh'
      //   } else {
      //     containerRef.current.style.width = '100vw'
      //     containerRef.current.style.height = 'auto'
      //   }
      // }
      setHeight(el.offsetHeight)
    }
  }

  const getPosition = (val) => {
    if (!eleHeight) return {}
    const top = (eleHeight * val.topValue) / 100
    const height = (eleHeight * val.heightValue) / 100
    return {
      top: `${top}px`,
      height,
      width: val.width,
    }
  }

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return [containerRef, getPosition, onResize]
}

export default useCalculateSize
