import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import styled from 'styled-components'
import Link from 'next/link'
import { Skeleton } from 'antd'
import { useRouter } from 'next/router'
import { MobileLayout } from '../src/components'
import { colors } from '../src/configs/color'
import { API } from '../src/configs'
import useCalculateSize from '../src/libs/useCalculateSize'
import { FullImageWrapper } from '../src/components/common'
import styles from '../styles/Home.module.css'

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
  position: absolute;
  cursor: pointer;
`

const CardContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  transition: transform .2s;
  cursor: pointer;
  height: 50px;
  overflow: hidden;
  transition: transform .2s;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;

  :hover {
    transform: scale(1.05);
  }

  @-webkit-keyframes fadeIn {
    from { opacity: 0; }
      to { opacity: 1; }
  }
  @keyframes fadeIn {
      from { opacity: 0; }
        to { opacity: 1; }
  }
`

const Logo = styled(LazyLoadImage)`
  max-width: 20%;
  max-height: 80%;
  margin: 0.5em 0.8em;
`

const CompanyName = styled.div`
  font-weight: bold;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  word-wrap: break-word;
  max-height: 3em;
  line-height: 1.5em;
  margin-right: 0.5em;
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
}

CompanyCard.defaultProps = {
  style: {},
}

const Desktop = ({ booths, scrollPosition }) => {
  const [containerRef, getPosition, onResize] = useCalculateSize()
  const specialNumber = [{ number: 5, fixedIndex: 2 }]

  const boothS = useMemo(() => {
    const specialPositionBooth = booths.filter((item) => item.subType === 'S' && specialNumber.map(({ number }) => number).includes(item.number))
    const formatedBooth = booths.filter((item) => item.subType === 'S' && !specialNumber.map(({ number }) => number).includes(item.number))
    specialPositionBooth.forEach((item) => {
      const positon = specialNumber.find(({ number }) => number === item.number)
      formatedBooth.splice(2, positon, item)
    })
    return formatedBooth
  }, [booths])

  const boothM = useMemo(() => booths.filter((item) => item.subType === 'M'), [booths])

  const boothL = useMemo(() => booths.filter((item) => item.subType === 'L'), [booths])

  const basePosition = {
    heightValue: 5.5,
    width: '11.5%',
  }

  const standard1stRowPosition = [
    {
      ...getPosition({ ...basePosition, topValue: 42 }),
      left: '5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 42 }),
      left: '25%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 42 }),
      left: '44.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 42 }),
      left: '65%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 42 }),
      left: '85%',
    },
  ]

  const standard2ndRowPosition = [
    {
      ...getPosition({ ...basePosition, topValue: 32.7 }),
      left: '10.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 32.7 }),
      left: '27.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 32.7 }),
      left: '44.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 32.7 }),
      left: '61.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 32.7 }),
      left: '78.5%',
    },
  ]

  const standard3thRowPosition = [
    {
      ...getPosition({ ...basePosition, topValue: 25.8 }),
      left: '14.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 25.8 }),
      left: '29.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 25.8 }),
      left: '44.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 25.8 }),
      left: '59.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 25.8 }),
      left: '74.5%',
    },
  ]

  const standard4thRowPosition = [
    {
      ...getPosition({ ...basePosition, topValue: 18.8 }),
      left: '17.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 18.8 }),
      left: '30.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 18.8 }),
      left: '44.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 18.8 }),
      left: '57.5%',
    },
    // {
    //   ...getPosition({ ...basePosition, topValue: 18.8 }),
    //   left: '70.5%',
    // },
  ]

  const m1stRowPosition = [
    // {
    //   ...getPosition({ ...basePosition, topValue: 54.8 }),
    //   left: '4.5%',
    // },
    {
      ...getPosition({ ...basePosition, topValue: 54.8 }),
      left: '24.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 54.8 }),
      left: '64.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 54.8 }),
      left: '84.5%',
    },
  ]

  const l1stRowPosition = [
    {
      ...getPosition({
        heightValue: 7.9,
        width: '16.7%',
        topValue: 55.4,
      }),
      left: '41.95%',
    },
  ]

  const cardSStyle = {
    margin: 0,
    // fontSize: '0.7em',
    minHeight: '100%',
    maxHeight: '100%',
    border: `1px solid ${colors.black}`,
    fontSize: 'calc((5vw) / 7)',
    textAlign: 'center',
  }

  return (
    <div className={styles.container} style={{ paddingTop: '60px' }}>
      <FullImageWrapper customStyle="align-items: flex-start;">
        <Container ref={containerRef}>
          <Image
            src="https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/MockupExhition1920.jpg?fbclid=IwAR3zaUNtE-Pmm1iBQLbNFpzCd1LM-HpTkPA7r3utoQeO9TE2z-uN6VQ2-yY"
            alt="exhibition-bg"
            afterLoad={onResize}
            scrollPosition={scrollPosition}
          />
          {
            boothS.slice(0, 5).map((item, index) => {
              if (!standard1stRowPosition[index]) return null
              return (
                <Box
                  key={`${item.name}-${item.id}`}
                  style={standard1stRowPosition[index]}
                >
                  <CompanyCard
                    id={item.id}
                    name={item.name}
                    logo={item.logo}
                    style={cardSStyle}
                  />
                </Box>
              )
            })
          }
          {
            boothS.slice(5, 10).map((item, index) => {
              if (!standard2ndRowPosition[index]) return null
              return (
                <Box
                  key={`${item.name}-${item.id}`}
                  style={standard2ndRowPosition[index]}
                >
                  <CompanyCard
                    id={item.id}
                    name={item.name}
                    logo={item.logo}
                    style={cardSStyle}
                  />
                </Box>
              )
            })
          }
          {
            boothS.slice(10, 15).map((item, index) => {
              if (!standard3thRowPosition[index]) return null
              return (
                <Box
                  key={`${item.name}-${item.id}`}
                  style={standard3thRowPosition[index]}
                >
                  <CompanyCard
                    id={item.id}
                    name={item.name}
                    logo={item.logo}
                    style={cardSStyle}
                  />
                </Box>
              )
            })
          }
          {
            boothS.slice(15, 19).map((item, index) => {
              if (!standard4thRowPosition[index]) return null
              return (
                <Box
                  key={`${item.name}-${item.id}`}
                  style={standard4thRowPosition[index]}
                >
                  <CompanyCard
                    id={item.id}
                    name={item.name}
                    logo={item.logo}
                    style={cardSStyle}
                  />
                </Box>
              )
            })
          }
          {
            boothM.slice(0, 3).map((item, index) => {
              if (!m1stRowPosition[index]) return null
              return (
                <Box
                  key={`${item.name}-${item.id}`}
                  style={m1stRowPosition[index]}
                >
                  <CompanyCard
                    id={item.id}
                    name={item.name}
                    logo={item.logo}
                    style={cardSStyle}
                  />
                </Box>
              )
            })
          }
          {
            boothL.slice(0, 1).map((item, index) => {
              if (!l1stRowPosition[index]) return null
              return (
                <Box
                  key={`${item.name}-${item.id}`}
                  style={l1stRowPosition[index]}
                >
                  <CompanyCard
                    id={item.id}
                    name={item.name}
                    logo={item.logo}
                    style={{
                      ...cardSStyle,
                      fontSize: 'calc((7vw) / 7)',
                    }}
                  />
                </Box>
              )
            })
          }
        </Container>
      </FullImageWrapper>
    </div>
  )
}

Desktop.propTypes = {
  scrollPosition: PropTypes.shape({}),
  booths: PropTypes.arrayOf(PropTypes.shape({})),
}

Desktop.defaultProps = {
  scrollPosition: {},
  booths: [],
}

const Badge = styled.img`
  width: 5em;
`

const Content = styled.div`
  margin: 20px;
`

const CompanyListContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 5px 0;
  margin-bottom: 20px;
`

const Mobile = ({ scrollPosition, booths, isLoading }) => (
  <MobileLayout isShowTitle>
    <Image
      src="https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/MockupExhition1920.jpg?fbclid=IwAR3zaUNtE-Pmm1iBQLbNFpzCd1LM-HpTkPA7r3utoQeO9TE2z-uN6VQ2-yY"
      alt="lobby-bg"
      scrollPosition={scrollPosition}
    />
    <Content>
      {
        ['Gold', 'Standard'].map((type) => (
          isLoading
            ? (<Skeleton key={type} active />)
            : (
              <div key={type}>
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
              </div>
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
  const router = useRouter()

  useEffect(async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${API}/boot/getallboot`)
      setBooths(response.data.data.boots)
      setLoading(false)
    } catch (error) {
      console.warn(error)
      router.push({
        pathname: '/error',
        query: { status: 'error' },
      })
    }
  }, [])
  return (isMobile ? <Mobile {...props} booths={booths} isLoading={isLoading} /> : <Desktop {...props} booths={booths} isLoading={isLoading} />)
}

Exhibition.propTypes = {
  isMobile: PropTypes.bool,
}

Exhibition.defaultProps = {
  isMobile: false,
}

export default trackWindowScroll(Exhibition)
