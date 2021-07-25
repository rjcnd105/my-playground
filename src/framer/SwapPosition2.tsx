import * as React from 'react'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { css } from '@emotion/core'

type Props = {
  stage: number
}

// 기본적으로 Spring
// layout
const wrapCss = css`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #eeeeee;
  border: 3px solid #000000;
`
const basic = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 3px solid #f00;
`

const SwapPosition2 = ({ stage }: Props) => {
  return (
    <AnimateSharedLayout>
      <motion.div className="wrap" layout css={wrapCss}>
        <motion.div css={basic} style={{ height: stage * 10 }} layout>
          1
        </motion.div>
        <motion.div css={basic} style={{ height: stage * 10 }} layout>
          2
        </motion.div>
        <motion.div css={basic} style={{ height: stage * 10 }} layout>
          3
        </motion.div>
        <motion.div css={basic} style={{ height: stage * 10 }} layout>
          4
        </motion.div>
      </motion.div>
    </AnimateSharedLayout>
  )
}

export default SwapPosition2
