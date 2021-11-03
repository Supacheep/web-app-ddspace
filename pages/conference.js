import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import PropTypes from 'prop-types'
import { Image as ImageAntd } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import useCalculateSize from '../src/libs/useCalculateSize'
import { colors } from '../src/configs/color'
import styles from '../styles/Home.module.css'
import { FullImageWrapper } from '../src/components/common'
import { MobileLayout } from '../src/components'
import { API } from '../src/configs'

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
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const Perspective = styled.div`
  transform: perspective(20cm) rotateX(0deg) rotateY(3deg);
  position: absolute;
  cursor: pointer;
  overflow: hidden;
  :hover {
    border: 3px solid;
    background-color: rgba(255, 255, 255, 0.2);
    border-image: ${colors.themeGradient};
    border-image-slice: 9;
    border-style: solid;
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

const A = styled.a`
  ${(props) => (props.disabled ? 'pointer-events: none;' : '')}
`

const logConference = async (conferenceHallID, UserToken) => {
  try {
    if (conferenceHallID && UserToken) {
      await axios.post(
        `${API}/conferencehallvisitor/createconferencehallvisitor`,
        { conferenceHallID },
        {
          headers: {
            UserToken,
          },
        },
      )
    }
  } catch (err) {
    console.warn(err)
  }
}

const Desktop = ({
  isLoading, data, scrollPosition, userData, imageData,
}) => {
  const [containerRef, getPosition, onResize] = useCalculateSize()
  const [visible, setVisible] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const basePosition = {
    topValue: 43.7,
    heightValue: 33.7,
  }

  return (
    <div className={styles.container}>
      <FullImageWrapper>
        <Container ref={containerRef}>
          <Image
            src="https://icsmeeting.s3.ap-southeast-1.amazonaws.com/conference/pageConferceFinal2.jpg"
            alt="conference-bg"
            afterLoad={onResize}
            scrollPosition={scrollPosition}
          />
          <Perspective
            style={{
              ...getPosition(basePosition),
              left: '3.8%',
              width: '21.5%',
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
              ...getPosition({
                ...basePosition,
                heightValue: 33,
              }),
              left: '29.5%',
              width: '20%',
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
              ...getPosition({
                ...basePosition,
                heightValue: 32.5,
              }),
              left: '53.5%',
              width: '19%',
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
                topValue: 27.8,
                heightValue: 7.3,
                width: '18.7%',
              }),
              right: '5.1%',
            }}
          >
            <A
              target="_blank"
              href={`${data?.[0]?.zoomLink}`}
              rel="noopener noreferrer"
              disabled={isLoading}
              onClick={() => logConference(data?.[0]?.id, userData?.userToken)}
            >
              <ButtonImg
                src="/images/conference/BTNCON1.png"
                alt="hall_btn"
              />
            </A>
          </ButtonBox>
          <ButtonBox
            style={{
              ...getPosition({
                topValue: 38,
                heightValue: 7.3,
                width: '18.7%',
              }),
              right: '5%',
            }}
          >
            <A
              target="_blank"
              href={`${data?.[1]?.zoomLink}`}
              rel="noopener noreferrer"
              disabled={isLoading}
              onClick={() => logConference(data?.[1]?.id, userData?.userToken)}
            >
              <ButtonImg
                src="/images/conference/BTNCON2.png"
                alt="hall_btn"
              />
            </A>
          </ButtonBox>
          <ButtonBox
            style={{
              ...getPosition({
                topValue: 48.5,
                heightValue: 7.3,
                width: '18.7%',
              }),
              right: '5%',
            }}
          >
            <A
              target="_blank"
              href={`${data?.[2]?.zoomLink}`}
              rel="noopener noreferrer"
              disabled={isLoading}
              onClick={() => logConference(data?.[2]?.id, userData?.userToken)}
            >
              <ButtonImg
                src="/images/conference/BTNCON3.png"
                alt="hall_btn"
              />
            </A>
          </ButtonBox>
          <ButtonBox
            style={{
              ...getPosition({
                topValue: 58.5,
                heightValue: 7.3,
                width: '18.7%',
              }),
              right: '5%',
            }}
          >
            <A
              target="_blank"
              href={`${data?.[3]?.zoomLink}`}
              rel="noopener noreferrer"
              disabled={isLoading}
              onClick={() => logConference(data?.[3]?.id, userData?.userToken)}
            >
              <ButtonImg
                src="/images/conference/BTNCON4.png"
                alt="hall_btn"
              />
            </A>
          </ButtonBox>
          <ButtonBox
            style={{
              ...getPosition({
                topValue: 68.5,
                heightValue: 7.3,
                width: '18.7%',
              }),
              right: '5%',
            }}
          >
            <A
              target="_blank"
              href={`${data?.[4]?.zoomLink}`}
              rel="noopener noreferrer"
              disabled={isLoading}
              onClick={() => logConference(data?.[4]?.id, userData?.userToken)}
            >
              <ButtonImg
                src="/images/conference/BTNCON5.png"
                alt="hall_btn"
              />
            </A>
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
            imageData.map((src, index) => <ImageAntd key={`preview-${src}`} src={src} alt={`preview-${index}`} />)
          }
        </ImageAntd.PreviewGroup>
      </div>
    </div>
  )
}

Desktop.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    zoomLink: PropTypes.string,
    id: PropTypes.string,
  })),
  isLoading: PropTypes.bool,
  scrollPosition: PropTypes.shape({}),
  userData: PropTypes.shape({
    userToken: PropTypes.string,
  }),
  imageData: PropTypes.arrayOf(PropTypes.string),
}

Desktop.defaultProps = {
  data: undefined,
  isLoading: false,
  scrollPosition: {},
  userData: {},
  imageData: [],
}

const MobileImageContainer = styled.div`
  margin: 10px;
`

const H2 = styled.h2`
  text-align: center;
  color: ${colors.themeColor};
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 15px;
  max-width: 570px;
  margin: 20px auto;
  @media screen and (max-width: 345px) {
    grid-template-columns: auto;
  }
`

const MobileButton = styled.a`
  border-radius: 10px;
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  padding: 5px 10px;
  ${(props) => (props.disabled ? 'pointer-events: none;' : '')}
  h3 {
    margin: 0;
    margin-left: 10px;
    line-height: normal;
  }
  :hover {
    opacity: 0.8;
  }
  @media screen and (max-width: 345px) {
    margin: 5px 0 !important;
  }
`

const ConferenceLogo = styled.img`
  width: 20%;
`

const Mobile = ({
  scrollPosition, data, isLoading, userData, imageData,
}) => (
  <MobileLayout isShowTitle>
    <Image
      src="https://icsmeeting.s3.ap-southeast-1.amazonaws.com/conference/pageConferceFinal2.jpg"
      alt="conference-bg"
      scrollPosition={scrollPosition}
    />
    <ButtonContainer>
      <MobileButton
        style={{ marginRight: '5px' }}
        target="_blank"
        href={`${data?.[0]?.zoomLink}`}
        rel="noopener noreferrer"
        disabled={isLoading}
        onClick={() => logConference(data?.[0]?.id, userData?.userToken)}
      >
        <ConferenceLogo src="/images/conference/BTNConferenc.svg" />
        <h3>CONFERENCE HALL 1</h3>
      </MobileButton>
      <MobileButton
        style={{ marginLeft: '5px' }}
        target="_blank"
        href={`${data?.[1]?.zoomLink}`}
        rel="noopener noreferrer"
        disabled={isLoading}
        onClick={() => logConference(data?.[1]?.id, userData?.userToken)}
      >
        <ConferenceLogo src="/images/conference/BTNConferenc.svg" />
        <h3>CONFERENCE HALL 2</h3>
      </MobileButton>
    </ButtonContainer>
    <H2>PROGRAM BOARD</H2>
    {
      imageData.map((src) => (
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
  data: PropTypes.arrayOf(PropTypes.shape({
    zoomLink: PropTypes.string,
    id: PropTypes.string,
  })),
  isLoading: PropTypes.bool,
  scrollPosition: PropTypes.shape({}),
  userData: PropTypes.shape({
    userToken: PropTypes.string,
  }),
  imageData: PropTypes.arrayOf(PropTypes.string),
}

Mobile.defaultProps = {
  data: undefined,
  isLoading: false,
  scrollPosition: {},
  userData: {},
  imageData: [],
}

const Conference = ({ isMobile, ...props }) => {
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState(undefined)
  const [imageData, setImageData] = useState([])
  const router = useRouter()
  useEffect(() => {
    setLoading(true)
    axios.post(`${API}/conferencehall/getallconferencehall`)
      .then((response) => {
        setData(response?.data?.data?.conferenceHall)
        setLoading(false)
      })
      .catch(() => {
        router.push({
          pathname: '/error',
          query: { status: 'error' },
        })
      })
  }, [])

  useEffect(() => {
    axios.post(`${API}/programboard/getallprogramboard`)
      .then((response) => {
        const { programBoards } = response?.data?.data || {}
        if (programBoards) {
          setImageData(programBoards.map((item) => item.imageLink))
        }
      })
  }, [])

  return (isMobile ? <Mobile isLoading={isLoading} data={data} imageData={imageData} {...props} /> : <Desktop isLoading={isLoading} data={data} imageData={imageData} {...props} />)
}

Conference.propTypes = {
  isMobile: PropTypes.bool,
}

Conference.defaultProps = {
  isMobile: false,
}

export default trackWindowScroll(Conference)
