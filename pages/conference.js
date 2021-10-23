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
  transform: perspective(20cm) rotateX(0deg) rotateY(5deg);
  position: absolute;
  cursor: pointer;
  overflow: hidden;
  :hover {
    border: 3px solid ${colors.themeColor};
    background-color: rgba(255, 255, 255, 0.2);
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

const conferencePreviewImages = [
  'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/ConferenceHall/programDay1.jpg',
  'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/ConferenceHall/programDay2.jpg',
  'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/ConferenceHall/programDay3.jpg',
]

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
  isLoading, data, scrollPosition, userData,
}) => {
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
            src="https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/ConferenceHall/ConferenceHallForWeb.jpg"
            alt="conference-bg"
            afterLoad={onResize}
            scrollPosition={scrollPosition}
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
            <A
              target="_blank"
              href={`${data?.[0]?.zoomLink}`}
              rel="noopener noreferrer"
              disabled={isLoading}
              onClick={() => logConference(data?.[0]?.id, userData?.userToken)}
            >
              <ButtonImg
                src="/images/conference/hall-1-btn.jpeg"
                alt="hall_btn"
              />
            </A>
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
            <A
              target="_blank"
              href={`${data?.[1]?.zoomLink}`}
              rel="noopener noreferrer"
              disabled={isLoading}
              onClick={() => logConference(data?.[1]?.id, userData?.userToken)}
            >
              <ButtonImg
                src="/images/conference/hall-2-btn.jpeg"
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
            conferencePreviewImages.map((src, index) => <ImageAntd key={`preview-${src}`} src={`${src}?${Math.random()}`} alt={`preview-${index}`} />)
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
}

Desktop.defaultProps = {
  data: undefined,
  isLoading: false,
  scrollPosition: {},
  userData: {},
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
  scrollPosition, data, isLoading, userData,
}) => (
  <MobileLayout isShowTitle>
    <Image
      src="https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/ConferenceHall/ConferenceHallForWeb.jpg"
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
  data: PropTypes.arrayOf(PropTypes.shape({
    zoomLink: PropTypes.string,
    id: PropTypes.string,
  })),
  isLoading: PropTypes.bool,
  scrollPosition: PropTypes.shape({}),
  userData: PropTypes.shape({
    userToken: PropTypes.string,
  }),
}

Mobile.defaultProps = {
  data: undefined,
  isLoading: false,
  scrollPosition: {},
  userData: {},
}

const Conference = ({ isMobile, ...props }) => {
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState(undefined)
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
  return (isMobile ? <Mobile isLoading={isLoading} data={data} {...props} /> : <Desktop isLoading={isLoading} data={data} {...props} />)
}

Conference.propTypes = {
  isMobile: PropTypes.bool,
}

Conference.defaultProps = {
  isMobile: false,
}

export default trackWindowScroll(Conference)
