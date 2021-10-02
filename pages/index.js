import {
  useContext,
} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from '../styles/Home.module.css'
import userContext from '../src/context/userContext'
import { ModalLogin, YoutubePlayer } from '../src/components'
import { colors } from '../src/configs/color'
import { TitleH3 } from '../src/components/common'
import useCalculateSize from '../src/libs/useCalculateSize'

const Container = styled.div`
  position: relative;
`

const Image = styled.img`
  height: 100%;
  Width: 100%;
  object-fit: cover;
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
  :hover {
    transform: scale(1.1);
    box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
    -webkit-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
    -moz-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
  }
`

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.tan};
  margin-top: -65px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Desktop = ({ user }) => {
  const [containerRef, getPosition, onResize] = useCalculateSize()

  const basePosition = {
    topValue: 34,
    heightValue: 12,
    width: '26.5%',
  }

  return (
    <div className={styles.container}>
      <Wrapper>
        <Container ref={containerRef} id="container">
          <Image
            src="/images/lobby.png"
            alt="lobby-bg"
            onLoad={onResize}
          />
          <Box
            style={{
              ...getPosition(basePosition),
              right: '3%',
            }}
          >
            <Link href={{ pathname: '/exhibition' }}>
              <ButtonImg
                src="/images/exhibition_btn.svg"
                alt="exhibition_btn"
              />
            </Link>
          </Box>
          <Box
            style={{
              ...getPosition({
                ...basePosition,
                topValue: 33,
              }),
              left: '2.8%',
            }}
          >
            <Link href={{ pathname: '/conference' }}>
              <ButtonImg
                src="/images/conference_btn.svg"
                alt="conference_btn"
              />
            </Link>
          </Box>
          <Box
            style={{
              ...getPosition({
                topValue: 20.3,
                heightValue: 35.3,
                width: '36%',
              }),
              right: '31.8%',
              border: 0,
              backgroundColor: colors.black,
            }}
          >
            {
              user.userData && (
                <YoutubePlayer
                  videoID="6FIJfRINVLE"
                  autoplay
                  mute
                  loop
                />
              )
            }
          </Box>
        </Container>
      </Wrapper>
    </div>
  )
}

Desktop.propTypes = {
  user: PropTypes.shape({
    userData: PropTypes.shape({}),
  }),
}

Desktop.defaultProps = {
  user: {},
}

const MobileContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${colors.themeColor};

  .title {
    color: ${colors.white};
    background-color: ${colors.themeColor};
    margin: 0;
    padding: 1.5em;
  }
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 15px;
  max-width: 570px;
  margin: 20px auto;

  .img-btn {
    width: 95%;
    border-radius: 10px;
  }
`

const VideoSection = styled.div`
  width: 100%;
  height: 55vw;
  max-width: 540px;
  max-height: 310px;
  border: 5px solid ${colors.white};
  border-radius: 10px;
  background-color: ${colors.white};
  margin: 0 15px;
`

const YoutubeBox = styled.div`
  display: flex;
  justify-content: center;
`

const Mobile = ({ user }) => (
  <MobileContainer>
    <TitleH3 className="title">
      {'Annual Meeting of\nThe Society of Plastic and Reconstructive Surgeons of Thailand\nThe Society of Aesthetic Plastic Surgeons of Thailand'}
    </TitleH3>
    <div>
      <Image
        src="/images/pagelobbyMobile.png"
        alt="pagelobbyMobile-bg"
      />
    </div>
    <ButtonContainer>
      <Link href={{ pathname: '/exhibition' }}>
        <div style={{ textAlign: 'left' }}>
          <ButtonImg
            className="img-btn"
            src="/images/conference_btn.svg"
            alt="conference_btn"
          />
        </div>
      </Link>
      <Link href={{ pathname: '/exhibition' }}>
        <div style={{ textAlign: 'right' }}>
          <ButtonImg
            className="img-btn"
            src="/images/exhibition_btn.svg"
            alt="exhibition_btn"
          />
        </div>
      </Link>
    </ButtonContainer>
    {
      user.userData && (
        <YoutubeBox>
          <VideoSection>
            <YoutubePlayer
              videoID="6FIJfRINVLE"
              autoplay
              mute
              loop
            />
          </VideoSection>
        </YoutubeBox>
      )
    }
  </MobileContainer>
)

Mobile.propTypes = {
  user: PropTypes.shape({
    userData: PropTypes.shape({}),
  }),
}

Mobile.defaultProps = {
  user: false,
}

const Lobby = ({ isMobile }) => {
  const user = useContext(userContext)
  return (
    <>
      {isMobile ? <Mobile user={user} /> : <Desktop user={user} />}
      <ModalLogin
        visible={!user.userData && !user.isLoading}
        onFinish={(data) => {
          user.setUser(data)
        }}
      />
    </>
  )
}

Lobby.propTypes = {
  isMobile: PropTypes.bool,
}

Lobby.defaultProps = {
  isMobile: false,
}

export default Lobby
