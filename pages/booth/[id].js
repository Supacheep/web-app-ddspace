import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  Tabs,
  Skeleton,
  Button,
  message,
  Spin,
  Tooltip,
} from 'antd'
import axios from 'axios'
import { MobileLayout, YoutubePlayer, Swiper } from '../../src/components'
import { colors } from '../../src/configs/color'
import { API } from '../../src/configs'
import useCalculateSize from '../../src/libs/useCalculateSize'

const { TabPane } = Tabs

const Image = styled(LazyLoadImage)`
  height: auto;
  width: 90%;
  object-fit: cover;
  margin: auto;
`

const Section = styled.div`
  width: 95%;
  height: 50vw;
  border: 5px solid ${colors.white};
  border-radius: 10px;
  background-color: ${colors.white};
  overflow: hidden;
`

const Container = styled.div`
  .swiper-container {
    display: flex;
    flex-direction: column-reverse;
    .swiper-pagination {
      position: relative !important;
      margin-top: 10px;
    }
    .swiper-pagination-bullet-active {
      background-color: ${colors.themeColor};
    }
  }
`

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContentBox = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  .ant-tabs-tab {
    font-size: 18px;
  }
`

const CompanyName = styled.div`
  background-color: ${colors.themeColor};
  padding: 5px 10px;
  border-radius: 6px;
  color: ${colors.white};
  display: inline-block;
  font-size: 20px;
`

const Logo = styled.img`
  width: 18%;
`

const LinkButton = styled.a`
  background-color: ${colors.themeColor};
  padding: 5px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  margin: 5px;
  max-width: 190px;
  h3 {
    color: ${colors.white};
    margin: 0;
    margin-left: 5px;
    font-size: 12px;
  }
  :hover {
    opacity: 0.8;
  }
`

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 361px) {
    flex-flow: row wrap;
  }
`

const FilesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const CustomP = styled.p`
  margin: 0;
  margin-top: 10px;
`

const SpinContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vh;
`

const P = styled.p`
  white-space: break-spaces;
  width: 100%;
`

const Spining = () => (
  <SpinContainer>
    <Spin />
  </SpinContainer>
)

const logBooth = async (bootID, UserToken) => {
  try {
    if (bootID && UserToken) {
      await axios.post(
        `${API}/bootVisitor/createbootvisitor`,
        { bootID },
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

const Infometion = ({ data, isLoading }) => {
  const download = (url, filename) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = filename
        link.click()
      })
      .catch((err) => {
        console.error(err)
        message.error('Download failed')
      })
  }

  return (
    <>
      {
        data?.contactLink && (
          <LinkContainer>
            {
              data.contactLink.map((item, index) => (
                <LinkButton key={`contact-link-${item}`} href={item} target="_blank" rel="noopener noreferrer">
                  <Logo src="/images/exbition/link-zoom.svg" alt="link-zoom-logo" />
                  <h3>{`LIVE CONTACT ROOM ${index + 1}`}</h3>
                </LinkButton>
              ))
            }
          </LinkContainer>
        )
      }
      <ContentBox>
        {
          isLoading
            ? (<Skeleton.Button active />)
            : (
              <CompanyName>{data?.name}</CompanyName>
            )
        }
        <Tabs defaultActiveKey="1">
          <TabPane tab="About Us" key="1">
            {
              isLoading
                ? (<Skeleton active />)
                : (
                  <>
                    <h3>Company Description</h3>
                    <P>{data?.companyDescription}</P>
                  </>
                )
            }
          </TabPane>
          <TabPane tab="Download Files" key="2">
            {
              isLoading
                ? (<Skeleton active />)
                : (
                  data?.bootFiles?.map((item) => (
                    <FilesContainer>
                      <h3>{item.fileName}</h3>
                      <Button type="primary" onClick={() => download(item.link, item.fileName)}>Download Files</Button>
                    </FilesContainer>
                  ))
                )
            }
          </TabPane>
          <TabPane tab="Contact Us" key="3">
            {
              isLoading
                ? (<Skeleton active />)
                : (
                  <>
                    {
                      data?.website && (
                        <>
                          <CustomP>Website</CustomP>
                          <h3>{data.website}</h3>
                        </>
                      )
                    }
                    {
                      data?.email && (
                        <>
                          <CustomP>Email Address</CustomP>
                          <h3>{data.email}</h3>
                        </>
                      )
                    }
                    {
                      data?.telephoneNumber && (
                        <>
                          <CustomP>Telephone</CustomP>
                          <h3>{data.telephoneNumber}</h3>
                        </>
                      )
                    }
                    {
                      data?.facebook && (
                        <>
                          <CustomP>Facebook</CustomP>
                          <h3>{data?.facebook}</h3>
                        </>
                      )
                    }
                  </>
                )
            }
          </TabPane>
        </Tabs>
      </ContentBox>
    </>
  )
}

Infometion.propTypes = {
  data: PropTypes.shape({
    contactLink: PropTypes.arrayOf(PropTypes.string),
    bootFiles: PropTypes.arrayOf(PropTypes.shape({})),
    name: PropTypes.string,
    companyDescription: PropTypes.string,
    website: PropTypes.string,
    email: PropTypes.string,
    telephoneNumber: PropTypes.string,
    facebook: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
}

Infometion.defaultProps = {
  data: undefined,
  isLoading: false,
}

const ImgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const VideoBox = styled.div`
  position: absolute;
  cursor: pointer;
  overflow: hidden;
  background-color: ${colors.black};
  iframe {
    width: 100%;
    height: 100%;
  }
`

const ContactBox = styled.div`
  position: absolute;
  cursor: pointer;
  overflow: hidden;
`

const ContactBoxLogo = styled.img`
  width: 100%;
  height: auto;
`

const Desktop = ({ data, isLoading, scrollPosition }) => {
  const [
    containerRef,
    getPosition,
    onResize,
  ] = useCalculateSize()

  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading && !tooltipVisible) {
      setTimeout(() => {
        setTooltipVisible(true)
      }, 1000)
    }
  }, [isLoading])

  const videoPosition = () => {
    switch (data?.subType) {
      case 'L':
        return ({
          ...getPosition({
            topValue: 4.5,
            heightValue: 40.2,
            width: '23.6%',
          }),
          right: '19%',
        })
      case 'M':
        return ({
          ...getPosition({
            topValue: 25.2,
            heightValue: 27.5,
            width: '18.9%',
          }),
          right: '21.2%',
        })
      default:
        return ({
          ...getPosition({
            topValue: 29.3,
            heightValue: 19.2,
            width: '12.3%',
          }),
          right: '32.8%',
        })
    }
  }

  const contactPosition = () => {
    switch (data?.subType) {
      case 'L':
        return ([
          {
            ...getPosition({
              topValue: 47,
              heightValue: 13,
              width: '2.5%',
            }),
            left: '16%',
          },
          {
            ...getPosition({
              topValue: 47,
              heightValue: 13,
              width: '2.5%',
            }),
            left: '32.5%',
          },
          {
            ...getPosition({
              topValue: 47,
              heightValue: 13,
              width: '2.5%',
            }),
            left: '49%',
          },
        ])
      case 'M':
        return ([
          {
            ...getPosition({
              topValue: 47,
              heightValue: 13,
              width: '2.5%',
            }),
            left: '32.5%',
          },
          {
            ...getPosition({
              topValue: 33,
              heightValue: 13,
              width: '2.5%',
            }),
            left: '32.5%',
          },
        ])
      default:
        return ([
          {
            ...getPosition({
              topValue: 21,
              heightValue: 13,
              width: '2.5%',
            }),
            left: '29.5%',
          },
        ])
    }
  }

  return (
    <MobileLayout
      containerStyle={{
        backgroundColor: colors.grey200,
        padding: '50px',
      }}
      backStyle={{ color: colors.themeColor }}
    >
      {
        data?.imageLink ? (
          <ImgContainer ref={containerRef} id="image-container">
            <Image
              src={data.imageLink}
              alt="booth-bg"
              scrollPosition={scrollPosition}
              style={{ width: data?.subType === 'L' ? '90%' : '60%' }}
              afterLoad={() => {
                console.log('afterLoad')
                setImageLoaded(true)
                onResize()
              }}
            />
            {
              imageLoaded && (
                <>
                  <VideoBox style={videoPosition()}>
                    <YoutubePlayer
                      videoID={data?.youtube}
                      autoplay
                      mute
                      loop
                      hideUi
                    />
                  </VideoBox>
                  {
                    data.contactLink.map((item, index) => {
                      const positionObj = contactPosition()[index]
                      if (!positionObj) return null
                      return (
                        <a key={`contact-link-${item}`} href={item} target="_blank" rel="noopener noreferrer">
                          <ContactBox style={positionObj}>
                            <Tooltip
                              visible={tooltipVisible}
                              placement="top"
                              title={`LIVE CONTACT ROOM ${index + 1}`}
                              overlayInnerStyle={{
                                fontSize: 'calc((5vw) / 7)',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                              getPopupContainer={() => document.getElementById('image-container')}
                              overlayStyle={{ zIndex: 99 }}
                            >
                              <ContactBoxLogo src="/images/exbition/link-zoom.svg" alt="link-zoom-logo" />
                            </Tooltip>
                          </ContactBox>
                        </a>
                      )
                    })
                  }
                </>
              )
            }
          </ImgContainer>
        ) : <Spining />
      }
      <Infometion data={data} isLoading={isLoading} />
    </MobileLayout>
  )
}

Desktop.propTypes = {
  data: PropTypes.shape({
    imageLink: PropTypes.string,
    youtube: PropTypes.string,
    subType: PropTypes.string,
    contactLink: PropTypes.arrayOf(PropTypes.string),
  }),
  isLoading: PropTypes.bool,
  scrollPosition: PropTypes.shape({}),
}

Desktop.defaultProps = {
  data: undefined,
  isLoading: false,
  scrollPosition: {},
}

const Mobile = ({ data, isLoading }) => {
  const [swiperRef, setSwiperRef] = useState(null)
  return (
    <MobileLayout
      containerStyle={{
        backgroundColor: colors.grey200,
        padding: '15px',
      }}
    >
      <Container>
        {
          isLoading
            ? (<Spining />)
            : (
              <Swiper
                ref={swiperRef}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: true,
                }}
                onInit={(swiper) => setSwiperRef(swiper)}
              >
                <Box>
                  <Image
                    src={data?.imageLink}
                    alt="booth-bg"
                  />
                </Box>
                <Box>
                  <Section>
                    <YoutubePlayer
                      videoID={data?.youtube}
                      mute
                      loop
                      onStateChange={() => swiperRef?.autoplay?.stop()}
                    />
                  </Section>
                </Box>
              </Swiper>
            )
        }
        <Infometion data={data} isLoading={isLoading} />
      </Container>
    </MobileLayout>
  )
}

Mobile.propTypes = {
  data: PropTypes.shape({
    imageLink: PropTypes.string,
    youtube: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
}

Mobile.defaultProps = {
  data: undefined,
  isLoading: false,
}

const Booth = ({ isMobile, userData, ...props }) => {
  const [booth, setBooth] = useState(undefined)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    setLoading(true)
    axios.post(
      `${API}/boot/getbootbybootid`,
      { bootid: id },
    )
      .then((response) => {
        const resultData = response?.data?.data?.boot
        setBooth(resultData)
        logBooth(id, userData?.userToken)
        setLoading(false)
      })
      .catch((error) => {
        console.warn(error)
        router.push({
          pathname: '/error',
          query: { status: 'error' },
        })
      })
  }, [])

  return (isMobile ? <Mobile data={booth} isLoading={isLoading} /> : <Desktop data={booth} isLoading={isLoading} {...props} />)
}

Booth.propTypes = {
  isMobile: PropTypes.bool,
  userData: PropTypes.shape({
    userToken: PropTypes.string,
  }),
}

Booth.defaultProps = {
  isMobile: false,
  userData: {},
}
export default trackWindowScroll(Booth)
