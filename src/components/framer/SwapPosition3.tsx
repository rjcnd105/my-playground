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
  height: 300px;
  background-color: #eeeeee;
  border: 3px solid #000000;
`
const csss = [
  css`
    justify-content: space-between;
  `,
  css`
    justify-content: flex-end;
  `,
  css`
    flex-direction: row;
  `,
  css`
    flex-direction: row;
    justify-content: flex-end;
  `,
  css`
    justify-content: center;
  `,

  css`
    flex-direction: row;
    justify-content: space-between;
  `,
]

const basic = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
`

const SwapPosition3 = ({ stage }: Props) => {
  return (
    <AnimateSharedLayout>
      <motion.div
        className="wrap"
        layout
        css={[wrapCss, csss[stage % csss.length]]}
      >
        <motion.div css={basic} style={{ backgroundColor: 'red' }} layout>
          1
        </motion.div>
        <motion.div css={basic} style={{ backgroundColor: 'blue' }} layout>
          2
        </motion.div>
        <motion.div css={basic} style={{ backgroundColor: 'orange' }} layout>
          3
        </motion.div>
        <motion.div
          css={basic}
          style={{ backgroundColor: 'black', color: 'white' }}
          layout
        >
          4
        </motion.div>
      </motion.div>
    </AnimateSharedLayout>
  )
}

export default SwapPosition3
