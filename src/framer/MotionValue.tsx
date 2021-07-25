import * as React from 'react'
import {
  AnimateSharedLayout,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import css from './MotionValue.module.css'

type Props = {
  stage: number
}

const MotionValue = () => {
  const x = useMotionValue(100)
  const input = [0, 100, 200]
  const output = [0.5, 1, 0.5]
  const opacity = useTransform(x, input, output)
  const rotate = useTransform(x, input, [
    'rotate(-180deg)',
    'rotate(0deg)',
    'rotate(4200deg)',
  ])

  return (
    <div className={css.wrap}>
      <motion.button
        className={css.basic}
        drag="x"
        dragConstraints={{ left: 0, right: 200 }}
        style={{ x }}
      />
      <motion.div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#000',
          opacity,
          transform: rotate,
        }}
      />
    </div>
  )
}

export default MotionValue
