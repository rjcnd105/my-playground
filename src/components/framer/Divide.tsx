import * as React from 'react'
import { BoundingBox2D, motion, PanInfo, useDragControls } from 'framer-motion'
import { css } from '@emotion/core'
import { useEffect, useRef, useState } from 'react'

const style = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 500px;

  .left,
  .right {
    height: 100%;
    position: relative;
  }

  .left {
    position: absolute;
    opacity: 0.8;
    .controller {
      position: absolute;
      width: 5px;
      height: 100%;
      right: 0;
      top: 0;
      background-color: #777;
      cursor: pointer;
    }
    background-color: #ffaaaa;
  }
  .right {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #00ffff;
    flex: 1 1 auto;
  }
`

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
    <div className="container" css={style}>
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
