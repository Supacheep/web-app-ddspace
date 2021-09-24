import { Layout, Menu } from 'antd'
import '../styles/globals.css'
import styled, { ThemeProvider } from 'styled-components'
import withUserContext from '../src/hoc/withUserContext'

const { Header, Content, Footer } = Layout

const theme = {
  colors: {},
}

const exceptLoginPath = [
  '/',
  '/home',
]

const CustomHeader = styled(Header)`
  position: fixed;
  z-index: 1; 
  width: 100%; 
  background-color: #FFFFFF;
`

const CustomMenu = styled(Menu)`
  background-color: #FFFFFF;
`

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <CustomHeader>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Lobby</Menu.Item>
          <Menu.Item key="2">Conference Hall</Menu.Item>
          <Menu.Item key="3">Exhibition Hall</Menu.Item>
        </Menu>
      </CustomHeader>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Layout>
  )
}

MyApp.getInitialProps = async ({ Component, router, ctx }) => {
  // if (ctx.isServer) {
  if (ctx?.req?.cookies && !ctx.req.cookies.userData && !exceptLoginPath.includes(ctx.asPath)) {
    ctx.res.redirect('/')
    return {}
  }
  // }

  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}

export default withUserContext(MyApp)
