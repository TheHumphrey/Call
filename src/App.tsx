
import GlobalStyle from 'styles/global'

import { theme } from 'styles/theme'
import { ThemeProvider } from 'styled-components'

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  </>
);

export default App
