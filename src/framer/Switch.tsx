import * as React from 'react'

import { motion } from 'framer-motion'

type Props = { isOn: boolean; onClick?: React.MouseEventHandler }

const Switch = ({ isOn, onClick }: Props) => {
  return (
    <div onClick={onClick}>
      <motion.div className="handle" layout transition={spring} />
    </div>
  )
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

export default Switch
