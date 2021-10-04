import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import styled from 'styled-components'
import { MobileLayout } from '../src/components'
import { colors } from '../src/configs/color'

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
    transform: scale(1.02);
    box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
    -webkit-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
    -moz-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
  }
`

const CompanyName = styled.div`
  font-weight: bold;
`

const CompanyListContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  margin: 5px 0;
`

const CompanyCard = ({
  id, name, logo, style,
}) => (
  <CardContainer style={style}>
    <Logo
      src={logo}
      alt="company-logo"
    />
    <CompanyName>{name}</CompanyName>
  </CardContainer>
)

const data = [
  {
    id: 1,
    name: 'Company Name',
    logo: '/images/exbition/logoMock.svg',
  },
  {
    id: 2,
    name: 'Company Name',
    logo: '/images/exbition/logoMock.svg',
  },
  {
    id: 3,
    name: 'Company Name',
    logo: '/images/exbition/logoMock.svg',
  },
]

const Mobile = ({ scrollPosition }) => (
  <MobileLayout isShowTitle>
    <Image
      src="/images/lobby.png"
      alt="lobby-bg"
      placeholderSrc="/images/lobby-lowres.png"
      scrollPosition={scrollPosition}
    />
    <Content>
      <Badge
        src="/images/exbition/badge-platium.svg"
      />
      <CompanyListContainer>
        {
          data.map((item, index) => (
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
    </Content>
  </MobileLayout>
)

const Exhibition = ({ isMobile, ...props }) => (isMobile ? <Mobile {...props} /> : <div>Exhibition Hall</div>)

export default trackWindowScroll(Exhibition)
