import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

const opt = {
  once: true,
}
const useOnLoadedAllImages = (ref: RefObject<HTMLElement>, imgSelector = 'img') => {
  const allImgCount = useRef(0)
  const loadedImgCount = useRef(0)
  const [isLoaded, _setIsLoaded] = useState(false)
  const incLoadedImgCountOrSetLoaded = useCallback(() => {
    loadedImgCount.current += 1
    if (allImgCount.current === loadedImgCount.current) _setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!ref?.current) return

    const imgElArr = ref.current.querySelectorAll<HTMLImageElement>(imgSelector)

    allImgCount.current = [...imgElArr].reduce(
      (pv, imgEl) => (imgEl.complete ? pv : pv + 1),
      0
    )

    if (allImgCount.current === 0) {
      _setIsLoaded(true)
      return
    }

    imgElArr.forEach((imgEl) => {
      imgEl.addEventListener('load', incLoadedImgCountOrSetLoaded, opt)
      imgEl.addEventListener('error', incLoadedImgCountOrSetLoaded, opt)
    })
  }, [ref])

  return isLoaded
}

export default useOnLoadedAllImages
