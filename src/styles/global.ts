import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%
  }

  body {
      margin: 0;
      color: #000;
      user-select: none;
  }

  main {
    padding: 0px !important;
  }
`