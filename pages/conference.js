import { useState } from 'react'
import styled from 'styled-components'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import PropTypes from 'prop-types'
import { Image as ImageAntd } from 'antd'
import useCalculateSize from '../src/libs/useCalculateSize'
import { colors } from '../src/configs/color'
import styles from '../styles/Home.module.css'
import { FullImageWrapper } from '../src/components/common'

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

const Desktop = () => {
  const [containerRef, getPosition, onResize] = useCalculateSize()
  const [visible, setVisible] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const basePosition = {
    topValue: 42,
    heightValue: 50.5,
  }

  const conferencePreviewImages = [
    '/images/conference/program-01.jpeg',
    '/images/conference/program-02.jpeg',
    '/images/conference/program-03.jpeg',
  ]

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

const Conference = ({ isMobile }) => (isMobile ? <div>Conference Hall</div> : <Desktop />)

Conference.propTypes = {
  isMobile: PropTypes.bool,
}

Conference.defaultProps = {
  isMobile: false,
}

export default Conference
