import 'styled-components'

export const theme = {
  colors: {
    primary: '#2395FF',
    secondary: '#DF3044',
    grayLight: '#828282',
    grayDark: '#2F3134',
    white: '#FFFFFF',
    whiteMedium: '#FAFAFB',
    whiteDark: '#D1D1D1',
    greenLight: '#48C26A',
    blueMedium: '#339FFF',
    blueLight: 'rgba(123, 191, 255, 0.6);',
  }
}

declare module 'styled-components' {
  type TTheme = typeof theme

  export interface DefaultTheme extends TTheme { }
}