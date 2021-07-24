import * as React from 'react'
import { AnimateSharedLayout, motion } from 'framer-motion'
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
  position: absolute;
  width: 50%;
  height: 50%;
`

const cssss = [
  css`
    background-color: #ff9999;
  `,
  css`
    background-color: #99ff99;
  `,
  css`
    background-color: #9999ff;
  `,
  css`
    background-color: #ffff99;
  `,
]
const csss = [
  css`
    ${basic};
    top: 0;
    left: 0;
  `,
  css`
    ${basic};
    top: 0;
    left: 50%;
  `,
  css`
    ${basic};
    top: 50%;
    left: 50%;
  `,
  css`
    ${basic};
    top: 50%;
    left: 0;
  `,
]

const SwapPosition = ({ stage }: Props) => {
  return (
    <div className="wrap" css={wrapCss}>
      <motion.div css={[csss[stage % 4], cssss[0]]} layout>
        1
      </motion.div>
      <motion.div css={[csss[(stage + 1) % 4], cssss[1]]} layout>
        2
      </motion.div>
      <motion.div css={[csss[(stage + 2) % 4], cssss[2]]} layout>
        3
      </motion.div>
      <motion.div css={[csss[(stage + 3) % 4], cssss[3]]} layout>
        4
      </motion.div>
    </div>
  )
}

export default SwapPosition
