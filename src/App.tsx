import AppRouter from './routes/router'
import GlobalStyle from 'styles/global'

import { theme } from 'styles/theme'
import { ThemeProvider } from 'styled-components'

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <AppRouter />
      <GlobalStyle />
    </ThemeProvider>
  </>
);

export default App;
