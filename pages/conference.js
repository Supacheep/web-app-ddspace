import { useState } from 'react'
import styled from 'styled-components'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import PropTypes from 'prop-types'
import { Image as ImageAntd } from 'antd'
import useCalculateSize from '../src/libs/useCalculateSize'
import { colors } from '../src/configs/color'
import styles from '../styles/Home.module.css'
import { FullImageWrapper } from '../src/components/common'
import { MobileLayout } from '../src/components'

const Container = styled.div`
  position: relative;
`

const Image = styled(LazyLoadImage)`
  height: 100%;
  Width: 100%;
  object-fit: cover;
`

const Box = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const Perspective = styled.div`
  transform: perspective(20cm) rotateX(0deg) rotateY(5deg);
  position: absolute;
  cursor: pointer;
  overflow: hidden;
  :hover {
    border: 3px solid ${colors.themeColor};
  }
`

const ButtonImg = styled.img`
  transition: transform .2s;
  width: 100%;
  :hover {
    transform: scale(1.05);
  }
`

const ButtonBox = styled.div`
  position: absolute;
  cursor: pointer;
  overflow: hidden;
`

const conferencePreviewImages = [
  '/images/conference/program-01.jpeg',
  '/images/conference/program-02.jpeg',
  '/images/conference/program-03.jpeg',
]

const Desktop = () => {
  const [containerRef, getPosition, onResize] = useCalculateSize()
  const [visible, setVisible] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const basePosition = {
    topValue: 42,
    heightValue: 50.5,
  }

  return (
    <div className={styles.container}>
      <FullImageWrapper>
        <Container ref={containerRef}>
          <Image
            src="/images/conference/BGconferencePre.jpeg"
            alt="conference-bg"
            afterLoad={onResize}
          />
          <Perspective
            style={{
              ...getPosition(basePosition),
              left: '6.6%',
              width: '19.2%',
            }}
          >
            <Box
              onClick={() => {
                setVisible(true)
                setImageIndex(0)
              }}
            />
          </Perspective>
          <Perspective
            style={{
              ...getPosition(basePosition),
              left: '31%',
              width: '18%',
            }}
          >
            <Box
              onClick={() => {
                setVisible(true)
                setImageIndex(1)
              }}
            />
          </Perspective>
          <Perspective
            style={{
              ...getPosition(basePosition),
              left: '54%',
              width: '17%',
            }}
          >
            <Box
              onClick={() => {
                setVisible(true)
                setImageIndex(2)
              }}
            />
          </Perspective>
          <ButtonBox
            style={{
              ...getPosition({
                topValue: 42.4,
                heightValue: 11,
                width: '23%',
              }),
              right: '2.7%',
            }}
          >
            <a target="_blank" href="https://google.co.th/" rel="noopener noreferrer">
              <ButtonImg
                src="/images/conference/hall-1-btn.jpeg"
                alt="hall_btn"
              />
            </a>
          </ButtonBox>
          <ButtonBox
            style={{
              ...getPosition({
                topValue: 56.8,
                heightValue: 11,
                width: '23%',
              }),
              right: '2.7%',
            }}
          >
            <a target="_blank" href="https://google.co.th/" rel="noopener noreferrer">
              <ButtonImg
                src="/images/conference/hall-2-btn.jpeg"
                alt="hall_btn"
              />
            </a>
          </ButtonBox>
        </Container>
      </FullImageWrapper>
      <div style={{ display: 'none' }}>
        <ImageAntd.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
            current: imageIndex,
          }}
        >
          {
            conferencePreviewImages.map((src, index) => <ImageAntd key={`preview-${src}`} src={src} alt={`preview-${index}`} />)
          }
        </ImageAntd.PreviewGroup>
      </div>
    </div>
  )
}

const MobileImageContainer = styled.div`
  margin: 10px;
`

const H2 = styled.h2`
  text-align: center;
  color: ${colors.white};
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 15px;
  max-width: 570px;
  margin: 20px auto;
`

const MobileButton = styled.a`
  border-radius: 10px;
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  padding: 5px 10px;
  h3 {
    margin: 0;
    margin-left: 10px;
  }
  :hover {
    opacity: 0.8;
  }
`

const ConferenceLogo = styled.img`
  width: 20%;
`

const Mobile = ({ scrollPosition }) => (
  <MobileLayout isShowTitle>
    <Image
      src="/images/conference/BGconferencePre.jpeg"
      alt="conference-bg"
      scrollPosition={scrollPosition}
    />
    <ButtonContainer>
      <MobileButton
        style={{ marginRight: '5px' }}
        target="_blank"
        href="https://google.co.th/"
        rel="noopener noreferrer"
      >
        <ConferenceLogo src="/images/conference/BTNConferenc.svg" />
        <h3>CONFERENCE HALL 1</h3>
      </MobileButton>
      <MobileButton
        style={{ marginLeft: '5px' }}
        target="_blank"
        href="https://google.co.th/"
        rel="noopener noreferrer"
      >
        <ConferenceLogo src="/images/conference/BTNConferenc.svg" />
        <h3>CONFERENCE HALL 2</h3>
      </MobileButton>
    </ButtonContainer>
    <H2>PROGRAM BOARD</H2>
    {
      conferencePreviewImages.map((src) => (
        <MobileImageContainer>
          <Image
            key={`preview-${src}`}
            src={src}
            alt="conference-bg"
            scrollPosition={scrollPosition}
          />
        </MobileImageContainer>
      ))
    }
  </MobileLayout>
)

Mobile.propTypes = {
  scrollPosition: PropTypes.shape({}),
}

Mobile.defaultProps = {
  scrollPosition: {},
}

const Conference = ({ isMobile, ...props }) => (isMobile ? <Mobile {...props} /> : <Desktop />)

Conference.propTypes = {
  isMobile: PropTypes.bool,
}

Conference.defaultProps = {
  isMobile: false,
}

export default trackWindowScroll(Conference)
