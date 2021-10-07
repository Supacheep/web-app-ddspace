import React from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'

const SwiperComponent = ({ children, ...props }) => {
  SwiperCore.use([Navigation, Pagination, Autoplay])
  return (
    <Swiper
    // navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      spaceBetween={50}
      slidesPerView={1}
    //   onSlideChange={() => console.log('slide change')}
    //   onSwiper={(swiper) => console.log(swiper)}
      {...props}
    >
      {
        React.Children.map(children, (child) => <SwiperSlide>{child}</SwiperSlide>)
      }
    </Swiper>
  )
}

SwiperComponent.propTypes = {
  children: PropTypes.node,
}

SwiperComponent.defaultProps = {
  children: null,
}

export default SwiperComponent
