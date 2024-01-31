/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,scss,css,html}'],
  darkMode: false,
  variants: {
    extend: {
      borderRadius: ['hover'],
      height: ['hover']
    }
  },
  theme: {
    extend: {
      width: {
        408: '25.5rem',
        446: '27.875rem',
        300: '18.75rem',
        500: '31.25rem',
        62: '3.875rem',
        770: '48.125rem',
        76: '19rem',
        116: '29rem'
      },
      minWidth: {
        32: '8rem'
      },
      height: {
        18: '4.5rem',
        62: '3.875rem'
      },
      spacing: {
        75: '4.6875rem',
        22: '5.5rem',
        18: '4.5rem'
      },
      fontSize: {
        xxs: '0.625rem'
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
        6: '6 6 0%'
      }
    },
    colors: {
      status: { waiting: '#FFD336', leaking: '#FF8B36' },
      white: '#fff',
      black: '#121212',
      grey25: '#FCFCFD',
      grey50: '#191b1f',
      grey100: '#F2F4F7',
      grey200: '#2d2f35',
      grey300: '#D0D5DD',
      grey400: '#C4C4C4',
      grey500: '#636366',
      grey600: '#8E8E93',
      grey700: '#afb3ba',
      grey750: '#3A3A3C',
      grey800: '#2C2C2E',
      grey850: '#2d2e35',
      grey900: '#202024',
      grey950: '#1F2023',
      yellow: '#ffd467',
      yellow300: '#F2D740',
      danger: '#E75F55',
      primary: 'var(--color-primary)',
      primary50: 'var(--color-primary50)',
      primary100: 'var(--color-primary100)',
      primary300: 'var(--color-primary300)',
      primary500: 'var(--color-primary500)',
      primary700: 'var(--color-primary700)',
      background: 'var(--color-background)',
      background100: 'var(--color-background100)',
      background200: 'var(--color-background200)',
      background300: 'var(--color-background300)',
      background400: 'var(--color-background400)',
      background500: 'var(--color-background500)',
      borderColor: 'var(--color-borderColor)',
      textBase: 'var(--color-textBase)',
      textLabel: 'var(--color-textLabel)',
      textInputTitle: 'var(--color-textInputTitle)',
      navItem: 'var(--color-navItem)',
      navItemHover: 'var(--color-navItemHover)',
      error: '#dc3545',
      red: '#FD4040',
      red200: '#FF7070',
      red300: '#FDA29B',
      red400: '#B42318',
      red500: '#FFE2E0',
      border: '#636366',
      innerBorder: '#48484A'
    }
  },
  plugins: []
}
