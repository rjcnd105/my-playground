import * as React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'

const style = css`
  display: flex;
  width: 100%;
  height: 100%;

  .left,
  .right {
    width: 50%;
    height: 100%;
  }

  .left {
    background-color: #ff0000;
  }
  .right {
    background-color: #00ffff;
  }
`

const Divide = () => {
  return (
    <div className="container" css={style}>
      <motion.div className="left">Left</motion.div>
      <motion.div className="right">right</motion.div>
    </div>
  )
}

export default Divide
