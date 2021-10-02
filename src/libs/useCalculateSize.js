import { useEffect, useRef, useState } from 'react'

const useCalculateSize = () => {
  const containerRef = useRef()
  const [eleHeight, setHeight] = useState()

  const onResize = () => {
    const el = containerRef?.current
    if (el) {
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
