import './styles.scss'

import { FC } from 'react'

interface SwitchProps {
  isToggled: boolean
  onToggle: () => void
}

const Switch: FC<SwitchProps> = ({ isToggled, onToggle }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="slider round"></span>
    </label>
  )
}

export default Switch
