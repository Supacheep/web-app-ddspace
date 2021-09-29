import {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import { Button } from 'antd'
import styles from '../styles/Home.module.css'
import userContext from '../src/context/userContext'
import { ModalLogin, YoutubePlayer } from '../src/components'
import { colors } from '../src/configs/color'
import { TitleH3 } from '../src/components/common'

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
  background-color: #A9A699;
  margin-top: -65px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Desktop = () => {
  const user = useContext(userContext)
  const [eleHeight, setHeight] = useState()
  const image = useRef()

  const onResize = () => {
    const box = document.querySelector('#container')
    setHeight(box.offsetHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  useEffect(() => {
    onResize()
  }, [])

  useEffect(() => {
    if (image.current.complete) onResize()
  }, [])

  const getPosition = (val) => {
    if (!eleHeight) return {}
    const top = (eleHeight * val.topValue) / 100
    const height = (eleHeight * val.heightValue) / 100
    return {
      top: `${top}px`,
      height,
      width: val.width,
    }
  }

  const basePosition = {
    topValue: 34,
    heightValue: 12,
    width: '26.5%',
  }

  return (
    <div className={styles.container}>
      <Wrapper>
        <Container id="container">
          <Image
            ref={image}
            src="/images/lobby.png"
            alt="lobby-bg"
            onLoad={onResize}
          />
          <Box
            style={{
              ...getPosition(basePosition),
              right: '3%',
            }}
            onClick={() => { Router.push('/exhibition') }}
          >
            <ButtonImg
              src="/images/exhibition_btn.svg"
              alt="exhibition_btn"
            />
          </Box>
          <Box
            style={{
              ...getPosition(basePosition),
              left: '2.5%',
            }}
          >
            <ButtonImg
              src="/images/conference_btn.svg"
              alt="conference_btn"
            />
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
              backgroundColor: '#000',
            }}
          >
            {
              user.userData && (
                <iframe
                  src="https://www.youtube.com/embed/6FIJfRINVLE?autoplay=1&mute=1&loop=1&playlist=6FIJfRINVLE"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
            }
          </Box>
        </Container>
      </Wrapper>
      <ModalLogin
        visible={!user.userData && !user.isLoading}
        onFinish={(data) => {
          user.setUser(data)
          console.log('onFinish', data)
        }}
      />
    </div>
  )
}

const MobileContainer = styled.div`
  width: 100vw;
  height: 100vh;
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
  margin: auto;

  .img-btn {
    width: 95%;
    border-radius: 10px;
  }
`

const Mobile = () => (
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
      <ButtonImg
        className="img-btn"
        src="/images/conference_btn.svg"
        alt="conference_btn"
      />
      <ButtonImg
        className="img-btn"
        src="/images/exhibition_btn.svg"
        alt="exhibition_btn"
      />
    </ButtonContainer>
    <YoutubePlayer
      videoID="6FIJfRINVLE"
      autoplay
      mute
      loop
    />
  </MobileContainer>
)

export default ({ isMobile }) => (isMobile ? <Mobile /> : <Desktop />)
