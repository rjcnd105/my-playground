import * as React from 'react'
import {
  AnimateSharedLayout,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { css } from '@emotion/core'

type Props = {
  stage: number
}

// 기본적으로 Spring
// layout 속성은 위치 값만 변경된다.
const wrapCss = css`
  position: relative;
  width: 300px;
  height: 300px;
  background-color: #eeeeee;
`
const basic = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: #ff9999;
  border-radius: 50%;
`

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
    <div className="wrap" css={wrapCss}>
      <motion.button
        css={basic}
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
