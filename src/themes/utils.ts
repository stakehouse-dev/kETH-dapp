import { themes } from './index'

export interface ITheme {
  [key: string]: string
}

export interface IThemes {
  [key: string]: ITheme
}

export interface IMappedTheme {
  [key: string]: string | null
}

export const mapTheme = (variables: ITheme): IMappedTheme => {
  return {
    '--color-primary': variables.primary || '',
    '--color-primary50': variables.primary50 || '',
    '--color-primary100': variables.primary100 || '',
    '--color-primary300': variables.primary300 || '',
    '--color-primary500': variables.primary500 || '',
    '--color-primary700': variables.primary700 || '',
    '--color-background': variables.background || '',
    '--color-background100': variables.background100 || '',
    '--color-background200': variables.background200 || '',
    '--color-background300': variables.background300 || '',
    '--color-background400': variables.background400 || '',
    '--color-background500': variables.background500 || '',
    '--color-borderColor': variables.borderColor || '',
    '--color-textBase': variables.textBase || '',
    '--color-textLabel': variables.textLabel || '',
    '--color-textInputTitle': variables.textInputTitle || '',
    '--color-navItem': variables.navItem || '',
    '--color-navItemHover': variables.navItemHover || ''
  }
}

export const applyTheme = (theme: string): void => {
  const themeObject: IMappedTheme = mapTheme(themes[theme])
  if (!themeObject) return

  const root = document.documentElement

  Object.keys(themeObject).forEach((property) => {
    if (property === 'name') {
      return
    }

    root.style.setProperty(property, themeObject[property])
  })
}

export const extend = (extending: ITheme, newTheme: ITheme): ITheme => {
  return { ...extending, ...newTheme }
}
