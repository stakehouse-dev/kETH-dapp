import dark from './dark'
import light from './light'
import { IThemes } from './utils'

/**
 * The default theme to load
 */
export const DEFAULT_THEME: string = 'dark'

export const themes: IThemes = {
  dark,
  light
}
