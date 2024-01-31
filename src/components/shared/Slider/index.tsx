import './styles.scss'

import ReactSlider from 'react-slider'

interface SliderProps {
  value: number
  onChange: (value: number) => void
}

export const Slider = ({ value, onChange }: SliderProps) => {
  return (
    <ReactSlider
      className="w-full h-2 rounded-full bg-grey500 mb-2"
      thumbClassName="w-6 h-6 rounded-full bg-grey900 border border-primary -top-2"
      trackClassName="track"
      value={value}
      onChange={onChange}
    />
  )
}
