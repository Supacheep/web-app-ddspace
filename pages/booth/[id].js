import { useState } from 'react'
// import { useRouter } from 'next/router'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import { MobileLayout, YoutubePlayer, Swiper } from '../../src/components'
import { colors } from '../../src/configs/color'

const { TabPane } = Tabs

const Image = styled(LazyLoadImage)`
  height: auto;
  Width: 90%;
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
`

const CompanyName = styled.div`
  background-color: ${colors.themeColor};
  padding: 5px 10px;
  border-radius: 6px;
  color: ${colors.white};
  display: inline-block;
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
  max-width: 160px;
  h3 {
    color: ${colors.white};
    margin: 0;
    margin-left: 5px;
    font-size: 10px;
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

const Infometion = () => {
  function callback(key) {
    console.log(key)
  }
  return (
    <>
      <LinkContainer>
        <LinkButton>
          <Logo src="/images/exbition/link-zoom.svg" alt="link-zoom-logo" />
          <h3>LIVE CONTACT ROOM 1</h3>
        </LinkButton>
        <LinkButton>
          <Logo src="/images/exbition/link-zoom.svg" alt="link-zoom-logo" />
          <h3>LIVE CONTACT ROOM 2</h3>
        </LinkButton>
        <LinkButton>
          <Logo src="/images/exbition/link-zoom.svg" alt="link-zoom-logo" />
          <h3>LIVE CONTACT ROOM 3</h3>
        </LinkButton>
      </LinkContainer>
      <ContentBox>
        <CompanyName>COMPANY NAME</CompanyName>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="About Us" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Download Files" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Contact Us" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </ContentBox>
    </>
  )
}

const Mobile = () => {
  // const router = useRouter()
  // const { id } = router.query
  const [swiperRef, setSwiperRef] = useState(null)

  return (
    <MobileLayout
      isShowBack
      containerStyle={{ backgroundColor: colors.grey200 }}
      backStyle={{ color: colors.themeColor }}
    >
      {/* <div>{`Booth ${id}`}</div> */}
      <Container>
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
              src="/images/exbition/booth-l.png"
              alt="lobby-bg"
            />
          </Box>
          <Box>
            <Section>
              <YoutubePlayer
                videoID="6FIJfRINVLE"
                mute
                loop
                onStateChange={() => swiperRef?.autoplay?.stop()}
              />
            </Section>
          </Box>
        </Swiper>
        <Infometion />
      </Container>
    </MobileLayout>
  )
}

const Booth = ({ isMobile }) => (isMobile ? <Mobile /> : <div>Booth</div>)

Booth.propTypes = {
  isMobile: PropTypes.bool,
}

Booth.defaultProps = {
  isMobile: false,
}
export default Booth
