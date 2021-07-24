import * as React from 'react'
import { motion, PanInfo, useDragControls } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import style from './Divide.module.css'

const Divide = () => {
  const [originalWidth, setOriginalWidth] = useState(0)
  const [controllX, setControllX] = useState(0)
  const dragControls = useDragControls()
  const ref = useRef<HTMLDivElement>(null)
  const onDrag = (e: MouseEvent, panInfo: PanInfo) => {
    console.log(panInfo)
    console.log(dragControls)
    setControllX(panInfo.offset.x)
  }

  useEffect(() => {
    console.log(ref.current)
    if (ref?.current) {
      setOriginalWidth(ref.current.clientWidth)
    }
  })

  return (
    <div className={style.css}>
      <motion.div
        className="left"
        ref={ref}
        style={{ width: originalWidth + controllX }}
      >
        Left
        <motion.div
          className="controller"
          drag="x"
          onDrag={onDrag}
          dragControls={dragControls}
          dragConstraints={{ left: 0, right: originalWidth }}
          dragMomentum={false}
        />
      </motion.div>
      <motion.div className="right"></motion.div>
    </div>
  )
}

export default Divide
