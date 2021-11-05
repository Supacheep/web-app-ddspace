import {
  useContext,
  useState,
} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import styles from '../styles/Home.module.css'
import userContext from '../src/context/userContext'
import {
  ModalLogin, MobileLayout, ModalLoading,
} from '../src/components'
import useCalculateSize from '../src/libs/useCalculateSize'
import { FullImageWrapper } from '../src/components/common'
import { colors } from '../src/configs/color'

const Container = styled.div`
  position: relative;
`

const Image = styled(LazyLoadImage)`
  height: 100%;
  width: 100%;
  object-fit: cover;

  box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
  -webkit-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
  -moz-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
`

const Box = styled.div`
  position: absolute;
  cursor: pointer;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
  }
`

const ButtonImg = styled.img`
  transition: transform .2s;
  width: 100%;
  :hover {
    transform: scale(1.04);
  }
`

const Desktop = ({ scrollPosition }) => {
  const [containerRef, getPosition, onResize] = useCalculateSize()

  const basePosition = {
    topValue: 26,
    heightValue: 12,
    width: '27.6%',
  }

  return (
    <div className={styles.container}>
      <FullImageWrapper>
        <Container ref={containerRef} id="container">
          <Image
            src="https://icsmeeting.s3.ap-southeast-1.amazonaws.com/Lobby/pagelobbyFinal.jpg?fbclid=IwAR0R6fDJ2tlBBS-oUNmXHGkFwbpwaPE-Y9SSEZIPj4fU0BSyclnfO8jzlK8"
            alt="lobby-bg"
            afterLoad={onResize}
            scrollPosition={scrollPosition}
          />
          <Box
            style={{
              ...getPosition({
                ...basePosition,
                topValue: 26.3,
              }),
              right: '3%',
              borderRadius: '5px',
              borderBottomRightRadius: '18px',
            }}
          >
            <Link href={{ pathname: '/exhibition' }}>
              <ButtonImg
                src="/images/lobby/BTNEXhition.png"
                alt="exhibition_btn"
              />
            </Link>
          </Box>
          <Box
            style={{
              ...getPosition({
                ...basePosition,
                topValue: 26.2,
              }),
              left: '4%',
              borderRadius: '5px',
              borderBottomLeftRadius: '18px',
            }}
          >
            <Link href={{ pathname: '/conference' }}>
              <ButtonImg
                src="/images/lobby/BTNConference.png"
                alt="conference_btn"
              />
            </Link>
          </Box>
          <Box
            style={{
              ...getPosition({
                topValue: 39,
                width: '17.5%',
                heightValue: 7.5,
              }),
              left: '14.2%',
              borderRadius: '5px',
              borderBottomLeftRadius: '10px',
            }}
          >
            <a href="https://www.google.co.th/" target="_blank" rel="noopener noreferrer">
              <ButtonImg
                src="/images/lobby/BTNEPoster.png"
                alt="conference_btn"
              />
            </a>
          </Box>
          <Box
            style={{
              ...getPosition({
                topValue: 48.6,
                width: '17%',
                heightValue: 7.5,
              }),
              left: '14.2%',
              borderRadius: '5px',
              borderBottomLeftRadius: '10px',
            }}
          >
            <a href="https://www.google.co.th/" target="_blank" rel="noopener noreferrer">
              <ButtonImg
                src="/images/lobby/BTNDownloadAbstact.png"
                alt="conference_btn"
              />
            </a>
          </Box>
        </Container>
      </FullImageWrapper>
    </div>
  )
}

Desktop.propTypes = {
  user: PropTypes.shape({
    userData: PropTypes.shape({}),
  }),
  scrollPosition: PropTypes.shape({}),
}

Desktop.defaultProps = {
  user: {},
  scrollPosition: {},
}

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 90%;
  max-width: 570px;
  margin: 20px auto;
  background: white;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  backdrop-filter: blur(2rem);
  padding: 15px;
  border-radius: 10px;
`

const Button = styled.div`
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.themeColor};
  padding: 12px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px
`

const SmallButton = styled.a`
  text-align: center;
  color: ${colors.themeColor};
  border: 3px solid ${colors.themeColor};
  padding: 12px;
  border-radius: 10px;
  font-size: 16px;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  font-weight: bold;
  @media screen and (max-width: 345px) {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 345px) {
    display: block;
  }
`

const Mobile = ({ scrollPosition }) => (
  <MobileLayout isShowTitle>
    <div>
      <Image
        src="https://icsmeeting.s3.ap-southeast-1.amazonaws.com/Lobby/pagelobbyFinal.jpg?fbclid=IwAR0R6fDJ2tlBBS-oUNmXHGkFwbpwaPE-Y9SSEZIPj4fU0BSyclnfO8jzlK8"
        alt="pagelobbyMobile-bg"
        scrollPosition={scrollPosition}
      />
    </div>
    <ButtonContainer>
      <Link href={{ pathname: '/exhibition' }}>
        <Button>
          EXHIBITION HALL
        </Button>
      </Link>
    </ButtonContainer>
    <ButtonContainer>
      <Link href={{ pathname: '/conference' }}>
        <Button>
          CONFERENCE HALL
        </Button>
      </Link>
      <FlexContainer>
        <SmallButton style={{ marginRight: 5 }} href="https://www.google.co.th/" target="_blank" rel="noopener noreferrer">
          E-Poster
        </SmallButton>
        <SmallButton style={{ marginLeft: 5 }} href="https://www.google.co.th/" target="_blank" rel="noopener noreferrer">
          {'E-Program &\nAbstract Book'}
        </SmallButton>
      </FlexContainer>
    </ButtonContainer>
  </MobileLayout>
)

Mobile.propTypes = {
  user: PropTypes.shape({
    userData: PropTypes.shape({}),
  }),
  scrollPosition: PropTypes.shape({}),
}

Mobile.defaultProps = {
  user: undefined,
  scrollPosition: {},
}

const Lobby = ({ isMobile, ...props }) => {
  const user = useContext(userContext)
  const [errorMsg, setErrorMsg] = useState('')
  return (
    <>
      {isMobile ? <Mobile user={user} {...props} /> : <Desktop user={user} {...props} />}
      <ModalLogin
        visible={!user.userData && !user.isLoading}
        error={errorMsg}
        onFinish={async (data) => {
          const res = await user.setUser(data)
          if (res?.message) {
            setErrorMsg(res.message)
          }
        }}
      />
      {!user.userData && user.isLoading && <ModalLoading />}
    </>
  )
}

Lobby.propTypes = {
  isMobile: PropTypes.bool,
}

Lobby.defaultProps = {
  isMobile: false,
}

export default trackWindowScroll(Lobby)
