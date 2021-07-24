import * as React from 'react'

import { Meta } from '@storybook/react'
import Divide from './Divide'
import Switch from './Switch'
import { useState } from 'react'
import SwapPosition from './SwapPosition'
import SwapPosition2 from './SwapPosition2'
import SwapPosition3 from './SwapPosition3'
import MotionValue from './MotionValue'
import styled from '@emotion/styled'

export default {
  title: 'framer',
  component: Divide,
} as Meta

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
// export const divide = () => <Divide />
// export const Switch1 = () => {
//   const [isOn, setOn] = useState(false)
//   return <Switch isOn onClick={() => setOn(!isOn)} />
// }

export const SwapPositionStories = () => {
  const [stage, setStage] = useState(0)
  return (
    <Wrap>
      <SwapPosition stage={stage} />
      <button onClick={() => setStage(stage + 1)}>++</button>
    </Wrap>
  )
}

export const SwapPositionStories2 = () => {
  const [stage, setStage] = useState(0)
  return (
    <Wrap>
      <SwapPosition2 stage={stage} />
      <button onClick={() => setStage(stage + 1)}>++</button>
    </Wrap>
  )
}
export const SwapPositionStories3 = () => {
  const [stage, setStage] = useState(0)
  return (
    <Wrap>
      <SwapPosition3 stage={stage} />
      <button onClick={() => setStage(stage + 1)}>++</button>
    </Wrap>
  )
}

export const MotionValueStories = () => {
  return (
    <Wrap>
      <MotionValue />
    </Wrap>
  )
}
