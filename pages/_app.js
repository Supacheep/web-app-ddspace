import '../styles/globals.css'
import { ThemeProvider } from 'styled-components'
import withUserContext from '../src/hoc/withUserContext'
const theme = {
  colors: {},
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default withUserContext(MyApp)
