import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { colors } from '../configs/color'
import { TitleH3 } from './common'

const MobileContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${colors.themeColor};
  padding-bottom: 15px;

  .title {
    color: ${colors.white};
    background-color: ${colors.themeColor};
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
            {'Annual Meeting of\nThe Society of Plastic and Reconstructive Surgeons of Thailand\nThe Society of Aesthetic Plastic Surgeons of Thailand'}
          </TitleH3>
        )
      }
      {isShowBack && <BackButton style={backStyle} onClick={() => router.back()}>BACK</BackButton>}
      {children}
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