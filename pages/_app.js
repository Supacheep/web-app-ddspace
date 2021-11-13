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
import 'react-lazy-load-image-component/src/effects/blur.css'

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
  z-index: 100; 
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
  cursor: pointer;
  :hover {
    background-color: ${colors.grey200};
  }
  ${(props) => (props.active ? `background-color: ${colors.greyF3}` : '')}
`

const LinkButtonMobile = styled.div`
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: ${colors.grey200};
  }
  ${(props) => (props.active ? `
    /* background-color: ${colors.greyF3} */
    background: white;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.3)
    );
  ` : '')}
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

const CustomDrawer = styled(Drawer)`
  .ant-drawer-content {
    background: white;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3)
    );
    backdrop-filter: blur(2rem);
  }
  .ant-drawer-header {
    background: transparent;
  }
  .ant-btn {
    background-color: transparent;
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
    document.body.scrollTo(0, 0)
    if (drawerVisible) {
      setDrawerVisible(false)
    }
  }, [pathname])

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  useEffect(() => {
    onResize()
    document.getElementById('holderStyle')?.remove()
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
            src="/images/LOGOICS_.png"
            alt="LogoICS"
            style={{ marginTop: 16 }}
          />
          <HeaderLogo
            src="/images/LogoAPALMS-01.svg"
            alt="LogoThAPALMS"
          />
        </MenuContainer>
      </Link>
      <MenuContainer justify="center">
        <div>
          <Link href={{ pathname: '/' }}>
            <LinkButton active={asPath === '/'} href="/">Lobby</LinkButton>
          </Link>
          <Link href={{ pathname: '/conference' }}>
            <LinkButton active={asPath === '/conference'} href="/conference">Conference Hall</LinkButton>
          </Link>
          <Link href={{ pathname: '/exhibition' }}>
            <LinkButton active={asPath === '/exhibition'} href="/exhibition">Exhibition Hall</LinkButton>
          </Link>
        </div>
      </MenuContainer>
      <MenuContainer justify="flex-end">
        <Dropdown overlay={dropdownMenu} trigger={['click']}>
          <ProfileButton>
            <ProfileComponent name={user?.userData?.name} />
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
            src="/images/LOGOICS_.png"
            alt="LogoICS"
            style={{ marginTop: 16 }}
          />
          <HeaderLogo
            src="/images/LogoAPALMS-01.svg"
            alt="LogoThAPALMS"
          />
        </MenuContainer>
      </Link>
      <MenuContainer justify="flex-end" />
    </CustomHeader>
  )

  return (
    <CustomLayout>
      <Head>
        <title>ICSMeeting2021</title>
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
      <CustomDrawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        maskStyle={{ opacity: 0, animation: 'none' }}
      >
        <Dropdown overlay={dropdownMenu} trigger={['click']}>
          <ProfileButton>
            <ProfileComponent name={user?.userData?.name} />
          </ProfileButton>
        </Dropdown>
        <Link href={{ pathname: '/' }}>
          <LinkButtonMobile active={asPath === '/'}>Lobby</LinkButtonMobile>
        </Link>
        <Link href={{ pathname: '/conference' }}>
          <LinkButtonMobile active={asPath === '/conference'}>Conference Hall</LinkButtonMobile>
        </Link>
        <Link href={{ pathname: '/exhibition' }}>
          <LinkButtonMobile active={asPath === '/exhibition'}>Exhibition Hall</LinkButtonMobile>
        </Link>
      </CustomDrawer>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} isMobile={isMobile} userData={user} />
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
