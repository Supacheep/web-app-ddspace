import { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import styled from 'styled-components'
import Link from 'next/link'
import { Skeleton } from 'antd'
import { MobileLayout } from '../src/components'
import { colors } from '../src/configs/color'
import { API } from '../src/configs'

const Image = styled(LazyLoadImage)`
  height: 100%;
  Width: 100%;
  object-fit: cover;
`

const Badge = styled.img`
  width: 5em;
`

const Content = styled.div`
  margin: 20px;
`

const Logo = styled.img`
  width: 35px;
  margin: 5px 10px;
`

const CardContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 6px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  transition: transform .2s;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`

const CompanyName = styled.div`
  font-weight: bold;
`

const CompanyListContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  margin: 5px 0;
  margin-bottom: 20px;
`

const CompanyCard = ({
  id, name, logo, style,
}) => (
  <Link href={{ pathname: `/booth/${id}` }}>
    <CardContainer style={style}>
      <Logo
        src={logo || '/images/exbition/logoMock.svg'}
        alt="company-logo"
      />
      <CompanyName>{name}</CompanyName>
    </CardContainer>
  </Link>
)

CompanyCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
}

CompanyCard.defaultProps = {
  style: {},
}

const Mobile = ({ scrollPosition, booths, isLoading }) => (
  <MobileLayout isShowTitle>
    <Image
      src="/images/lobby/pagelobbyFinaMobile.jpeg"
      alt="lobby-bg"
      scrollPosition={scrollPosition}
    />
    <Content>
      {
        ['Gold', 'Silver'].map((type) => (
          isLoading
            ? (<Skeleton active />)
            : (
              <>
                <Badge
                  src={`/images/exbition/badge-${type}.svg`}
                />
                <CompanyListContainer>
                  {
                  booths.filter((booth) => booth?.bootType === type).map((item, index) => (
                    <CompanyCard
                      id={item.id}
                      name={item.name}
                      logo={item.logo}
                      style={{
                        ...index % 2 ? {
                          marginLeft: 5,
                        } : {
                          marginRight: 5,
                        },
                      }}
                    />
                  ))
                }
                </CompanyListContainer>
              </>
            )
        ))
      }
    </Content>
  </MobileLayout>
)

Mobile.propTypes = {
  scrollPosition: PropTypes.shape({}),
  booths: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
}

Mobile.defaultProps = {
  scrollPosition: {},
  booths: [],
  isLoading: false,
}

const Exhibition = ({ isMobile, ...props }) => {
  const [booths, setBooths] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API}/boot/getallboot`)
      setBooths(response.data.data.boots)
      setLoading(false)
      console.log('response-b', response.data.data.boots)
    } catch (err) {
      console.warn(err)
    }
  }, [])
  return (isMobile ? <Mobile {...props} booths={booths} isLoading={isLoading} /> : <div>Exhibition Hall</div>)
}

Exhibition.propTypes = {
  isMobile: PropTypes.bool,
}

Exhibition.defaultProps = {
  isMobile: false,
}

export default trackWindowScroll(Exhibition)
