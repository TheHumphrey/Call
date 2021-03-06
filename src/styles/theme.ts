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
    greenMedium: '#46AB7A',
    blueBackgroundLight: '#E2EAF1',
    blueMedium: '#339FFF',
    blueLight: 'rgba(123, 191, 255, 0.6);',
    black: '#000',
    corPrimaria: '#238FEF',
    corPrimariaClaro2: '#D3E9FC',
    cinza1: '#334254',
    cinza2: '#66717F',
    cinza3: '#B3B8BF',
    cinza4: '#555',
    red1: '#E05757',
  }
}

declare module 'styled-components' {
  type TTheme = typeof theme

  export interface DefaultTheme extends TTheme { }
}