import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { colors } from '../configs/color'
import { TitleH3 } from './common'

const MobileContainer = styled.div`
  position: relative;
  width: 100vw;
  min-height: calc((100vh) - 65px);
  background: ${colors.themeGradient};

  .title {
    color: ${colors.themeColor};
    margin: 0;
    padding: 1.5em;
  }
`

const BackButton = styled.div`
  color: ${colors.white};
  font-size: 16px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: url("/images/TextureFooter-01.svg");
  background-repeat: repeat-x;
  background-position: center bottom;
  width: 190%;
  height: 150px;
  z-index: 1;
`

const Content = styled.div`
  padding-bottom: 145px;
  height: 100%;
  z-index: 2;
`

const MobileLayout = ({
  children,
  isShowTitle,
  isShowBack,
  containerStyle,
  backStyle,
}) => {
  const router = useRouter()
  return (
    <MobileContainer style={containerStyle}>
      {
        isShowTitle && (
          <TitleH3 className="title">
            The 42
            <sup>nd</sup>
            {' '}
            ICS WORLD CONGRESS
            <h4>in conjunction with</h4>
            17
            <sup>th</sup>
            {' '}
            APALMS-ISLSM Congress 2021
          </TitleH3>
        )
      }
      {isShowBack && <BackButton style={backStyle} onClick={() => router.back()}>BACK</BackButton>}
      <Content>
        {children}
      </Content>
      <Footer />
    </MobileContainer>
  )
}

MobileLayout.propTypes = {
  isShowTitle: PropTypes.bool,
  isShowBack: PropTypes.bool,
  children: PropTypes.node,
  containerStyle: PropTypes.shape({}),
  backStyle: PropTypes.shape({}),
}

MobileLayout.defaultProps = {
  isShowTitle: false,
  isShowBack: false,
  children: null,
  containerStyle: null,
  backStyle: null,
}

export default MobileLayout
