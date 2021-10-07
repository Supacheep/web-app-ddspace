import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import styled from 'styled-components'
import { MobileLayout, YoutubePlayer, Swiper } from '../../src/components'
import { colors } from '../../src/configs/color'

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
  padding: 5px;
`

const Container = styled.div`
  .swiper-container {
    display: flex;
    flex-direction: column-reverse;
    .swiper-pagination {
      position: relative !important;
      margin-top: 10px;
    }
  }
`

const Box = styled.div`
  display: flex;
  justify-content: center;
`

const Mobile = () => {
  const router = useRouter()
  const { id } = router.query
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
      </Container>
    </MobileLayout>
  )
}

const Booth = ({ isMobile }) => (isMobile ? <Mobile /> : <div>Booth</div>)

export default Booth
