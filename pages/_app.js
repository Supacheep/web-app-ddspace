import {
  useContext,
  useState,
  useEffect,
} from 'react'
import {
  Layout,
  Menu,
  Drawer,
  Dropdown,
  Button,
} from 'antd'
import Link from 'next/link'
import '../styles/globals.css'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import withUserContext from '../src/hoc/withUserContext'
import userContext from '../src/context/userContext'
import { colors } from '../src/configs/color'
import { Burger, ProfileComponent } from '../src/components'
import { HeaderLogo } from '../src/components/common'
import { MOBILE_WINDOW_WIDTH } from '../src/constants/constantsValue'

const { Header } = Layout

const theme = {
  colors: {},
}

const GlobalStyle = createGlobalStyle`
  .ant-dropdown-menu {
    border-radius: 8px;
    overflow: hidden;
  }
`

const hideHeaderList = ['/admin']

const exceptLoginPath = [
  '/',
  '/home',
  ...hideHeaderList,
]

const CustomHeader = styled(Header)`
  position: fixed;
  z-index: 1; 
  width: 100%; 
  background-color: ${colors.white};
  display: flex;
  justify-content: space-between;
  box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
  -webkit-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
  -moz-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
`

const LinkButton = styled.a`
  padding: 10px;
  margin: 0 20px;
  border-radius: 8px;
  font-size: 18px;
  white-space: nowrap;
  :hover {
    background-color: ${colors.grey200};
  }
`

const LinkButtonMobile = styled.div`
  padding: 10px;
  cursor: pointer;
  :hover {
    background-color: ${colors.grey200};
  }
`

const MenuContainer = styled.div`
  width: ${(props) => (props.justify === 'center' ? '50%' : '25%')};
  display: flex;
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: center;
`

const PaddingTop = styled.div`
  padding-top: 65px;
`

const CustomLayout = styled.div`
  #desktop-header {
    display: flex;
    padding: 0 20px;
  }
  #mobile-header {
    display: none;
    padding: 0 10px;
  }

  @media screen and (max-width: ${MOBILE_WINDOW_WIDTH}px) {
    #desktop-header {
      display: none;
    }
    #mobile-header {
      display: flex;
    }
  }

`

const ProfileButton = styled(Button)`
  height: auto;
  padding: 0;
  border: 0;
  box-shadow: none;
`

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  const { asPath, pathname } = useRouter()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const user = useContext(userContext)

  const onResize = () => {
    const nextIsMobile = window.innerWidth <= MOBILE_WINDOW_WIDTH
    if (nextIsMobile !== isMobile) {
      setIsMobile(nextIsMobile)
    }
  }

  useEffect(() => {
    if (!hideHeaderList.includes(pathname)) {
      user.fetchUser().then(({ userData }) => {
        if (!userData) {
          Router.push('/')
        }
      })
    }
  }, [asPath])

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  useEffect(() => {
    onResize()
  }, [])

  const dropdownMenu = (
    <Menu>
      <Menu.Item onClick={() => user.logout()}>
        <span>
          Logout
        </span>
      </Menu.Item>
    </Menu>
  )

  const DesktopHeader = () => (
    <CustomHeader id="desktop-header">
      <Link href={{ pathname: '/' }}>
        <MenuContainer>
          <HeaderLogo
            src="/images/LogoThPRS-01.svg"
            alt="LogoThPRS"
          />
          <HeaderLogo
            src="/images/LogoThSAPS_whole.svg"
            alt="LogoThPRS"
          />
        </MenuContainer>
      </Link>
      <MenuContainer justify="center">
        <div>
          <Link href={{ pathname: '/' }}>
            <LinkButton href="/">Lobby</LinkButton>
          </Link>
          <Link href={{ pathname: '/conference' }}>
            <LinkButton href="/conference">Conference Hall</LinkButton>
          </Link>
          <Link href={{ pathname: '/exhibition' }}>
            <LinkButton href="/exhibition">Exhibition Hall</LinkButton>
          </Link>
        </div>
      </MenuContainer>
      <MenuContainer justify="flex-end">
        <Dropdown overlay={dropdownMenu} trigger={['click']}>
          <ProfileButton>
            <ProfileComponent name={user?.userData?.email} />
          </ProfileButton>
        </Dropdown>
      </MenuContainer>
    </CustomHeader>
  )

  const MobileHeader = () => (
    <CustomHeader id="mobile-header">
      <MenuContainer>
        <Burger onClick={() => setDrawerVisible(!drawerVisible)} />
      </MenuContainer>
      <Link href={{ pathname: '/' }}>
        <MenuContainer justify="center">
          <HeaderLogo
            src="/images/LogoThPRS-01.svg"
            alt="LogoThPRS"
          />
          <HeaderLogo
            src="/images/LogoThSAPS_whole.svg"
            alt="LogoThPRS"
          />
        </MenuContainer>
      </Link>
      <MenuContainer justify="flex-end" />
    </CustomHeader>
  )

  return (
    <CustomLayout>
      <Head>
        <title>thprsmeeting2021</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      {
        !hideHeaderList.includes(pathname) && (
          <>
            <DesktopHeader />
            <MobileHeader />
            <PaddingTop />
          </>
        )
      }
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <Dropdown overlay={dropdownMenu} trigger={['click']}>
          <ProfileButton>
            <ProfileComponent name={user?.userData?.email} />
          </ProfileButton>
        </Dropdown>
        <Link href={{ pathname: '/' }}>
          <LinkButtonMobile>Lobby</LinkButtonMobile>
        </Link>
        <Link href={{ pathname: '/conference' }}>
          <LinkButtonMobile>Conference Hall</LinkButtonMobile>
        </Link>
        <Link href={{ pathname: '/exhibition' }}>
          <LinkButtonMobile>Exhibition Hall</LinkButtonMobile>
        </Link>
      </Drawer>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} isMobile={isMobile} />
      </ThemeProvider>
      <GlobalStyle />
    </CustomLayout>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  if (ctx?.req?.cookies && !ctx.req.cookies.userData && !exceptLoginPath.includes(ctx.asPath)) {
    ctx.res.redirect('/')
    return {}
  }

  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

export default withUserContext(MyApp)
