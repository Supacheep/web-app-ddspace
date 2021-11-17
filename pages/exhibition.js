import {
  useEffect, useState, useMemo, useContext,
} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import styled from 'styled-components'
import { Skeleton } from 'antd'
import { useRouter } from 'next/router'
import { MobileLayout } from '../src/components'
import { colors } from '../src/configs/color'
import { API } from '../src/configs'
import useCalculateSize from '../src/libs/useCalculateSize'
import { FullImageWrapper } from '../src/components/common'
import styles from '../styles/Home.module.css'
import userContext from '../src/context/userContext'

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

const Logo = styled(LazyLoadImage)`
  width: 55%;
  height: auto;
  margin: 0.5em 0.8em;
  margin: 5px auto;
  border-radius: 50%;
  box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
  -webkit-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
  -moz-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
`

const LinkBTN = styled.a`
  display: flex;
  justify-content: center;
  transition: transform .2s;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
  border-radius: 50%;

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

const CompanyCard = ({
  logo, style, bootLink, id,
}) => {
  const user = useContext(userContext)
  return (
    <LinkBTN
      {
        ...bootLink
          ? {
            href: bootLink,
            target: '_blank',
            rel: 'noopener noreferrer',
            onClick: () => logBooth(id, user?.userToken),
          }
          : {}
      }
      disabled={!bootLink}
    >
      <Logo
        src={logo || '/images/exbition/logoMock.svg'}
        alt="company-logo"
        style={style}
      />
    </LinkBTN>
  )
}

CompanyCard.propTypes = {
  logo: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  bootLink: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

CompanyCard.defaultProps = {
  style: {},
}

const ImageComponent = ({ booths, scrollPosition }) => {
  const [containerRef, getPosition, onResize] = useCalculateSize()

  const boothM = useMemo(() => booths.filter((item) => item.bootType === 'Standard'), [booths])

  const boothL = useMemo(() => booths.filter((item) => item.bootType === 'Silver'), [booths])

  const basePosition = {
    heightValue: 0,
    width: '8%',
  }

  const m2ndRowPosition = [
    {
      ...getPosition({ ...basePosition, topValue: 76 }),
      left: '26.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 76 }),
      left: '39.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 76 }),
      left: '52.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 76 }),
      left: '65.5%',
    },
  ]

  const m1stRowPosition = [
    {
      ...getPosition({ ...basePosition, topValue: 57.2 }),
      left: '26.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 57.2 }),
      left: '39.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 57.2 }),
      left: '52.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 57.2 }),
      left: '65.5%',
    },
    {
      ...getPosition({ ...basePosition, topValue: 57.2 }),
      left: '72%',
    },
  ]

  const l1stRowPosition = [
    {
      ...getPosition({
        heightValue: 16.4,
        width: '9%',
        topValue: 36.5,
      }),
      left: '45%',
    },
  ]

  const cardSStyle = {
    margin: 0,
    minHeight: '100%',
    maxHeight: '100%',
    width: '100%',
  }
  return (
    <Container ref={containerRef}>
      <Image
        src="https://icsmeeting.s3.ap-southeast-1.amazonaws.com/Exhition/ExhitionHall.jpg"
        alt="exhibition-bg"
        afterLoad={onResize}
        scrollPosition={scrollPosition}
      />
      {
          boothM.slice(4, 8).map((item, index) => {
            if (!m2ndRowPosition[index]) return null
            return (
              <Box
                key={`${item.name}-${item.id}`}
                style={m2ndRowPosition[index]}
              >
                <CompanyCard
                  id={item.id}
                  name={item.name}
                  logo={item.logo}
                  bootLink={item.bootLink}
                  style={cardSStyle}
                />
              </Box>
            )
          })
        }
      {
          boothM.slice(0, 4).map((item, index) => {
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
                  bootLink={item.bootLink}
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
                  bootLink={item.bootLink}
                  style={cardSStyle}
                />
              </Box>
            )
          })
        }
    </Container>
  )
}

ImageComponent.propTypes = {
  scrollPosition: PropTypes.shape({}),
  booths: PropTypes.arrayOf(PropTypes.shape({})),
}

ImageComponent.defaultProps = {
  scrollPosition: {},
  booths: [],
}

const Desktop = ({
  booths,
  scrollPosition,
}) => (
  <div className={styles.container}>
    <FullImageWrapper>
      <ImageComponent booths={booths} scrollPosition={scrollPosition} />
    </FullImageWrapper>
  </div>
)

Desktop.propTypes = {
  scrollPosition: PropTypes.shape({}),
  booths: PropTypes.arrayOf(PropTypes.shape({})),
}

Desktop.defaultProps = {
  scrollPosition: {},
  booths: [],
}

const Content = styled.div`
  margin: 20px;
`

const CompanyListContainer = styled.div`
  display: grid;
  ${(props) => (props.isStandard ? 'grid-template-columns: auto auto auto;' : 'grid-template-columns: 50% 50%;')}
  margin: 5px 0;
  margin-bottom: 20px;
`

const Title = styled.h3`
  color: ${colors.themeColor};
  font-size: 20px;
`

const Mobile = ({
  scrollPosition,
  booths,
  isLoading,
}) => (
  <MobileLayout isShowTitle>
    {/* <ImageComponent booths={booths} scrollPosition={scrollPosition} /> */}
    <Image
      src="https://icsmeeting.s3.ap-southeast-1.amazonaws.com/Exhition/ExhitionHall2.jpg"
      alt="exhibition-bg"
      scrollPosition={scrollPosition}
    />
    <Content>
      {
        ['Silver', 'Standard'].map((type) => (
          isLoading
            ? (<Skeleton key={type} active />)
            : (
              <div key={type}>
                <Title>{`${type} Sponsor`}</Title>
                <CompanyListContainer isStandard={type === 'Standard'}>
                  {
                  booths.filter((booth) => booth?.bootType === type).map((item) => (
                    <CompanyCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      logo={item.logo}
                      type={type}
                      bootLink={item.bootLink}
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
