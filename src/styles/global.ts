import { createGlobalStyle } from 'styled-components'

import logo from 'assets/logo-umc.png'
import awsCharacter from 'assets/aws-med-character.png'

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
    background: url(${logo}) center top no-repeat, url(${awsCharacter}) left bottom no-repeat;
    background-size: 15em, 10em;
    overflow: hidden;
  }

  main {
    padding: 0px !important;
  }
`