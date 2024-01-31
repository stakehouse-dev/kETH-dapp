import './styles.scss'

import { Menu, Transition } from '@headlessui/react'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { TMenu } from '@/types'

import Switch from '../Switch'

interface IProps {
  options: TMenu[]
}

const Dropdown: FC<PropsWithChildren<IProps>> = ({ children, options }) => {
  const [isToggled, setIsToggled] = useState(true)

  function handleOptionClick(option: TMenu): void {
    if (option.disabled) return
    if (option.onClick) {
      option.onClick()
    }
  }

  useEffect(() => {
    if (!isToggled) {
      window.open('https://lsd.joinstakehouse.com/', '_self')
    }
  }, [isToggled])

  return (
    <Menu as="div" className="relative" style={{ height: 38 }}>
      <Menu.Button>{children}</Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0">
        <Menu.Items className="menu__popup">
          {options.map((option) => (
            <Menu.Item key={option.id} disabled={option.disabled}>
              {({ active, disabled }) => (
                <div
                  className={`${active ? 'menu__item--selected' : 'menu__item'}
                    ${disabled ? 'disabled' : ''}`}
                  onClick={() => handleOptionClick(option)}>
                  {option.icon}
                  <span>{option.label}</span>
                  {option.toggle && (
                    <>
                      <p className="testModeStatus">On</p>
                      <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
                    </>
                  )}
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
