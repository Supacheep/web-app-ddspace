import PropTypes from 'prop-types'
import styled from 'styled-components'
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

const MobileLayout = ({ children, isShowTitle }) => (
  <MobileContainer>
    {
      isShowTitle && (
        <TitleH3 className="title">
            {'Annual Meeting of\nThe Society of Plastic and Reconstructive Surgeons of Thailand\nThe Society of Aesthetic Plastic Surgeons of Thailand'}
        </TitleH3>
      )
    }
    {children}
  </MobileContainer>
)

MobileLayout.propTypes = {
  isShowTitle: PropTypes.bool,
  children: PropTypes.node,
}

MobileLayout.defaultProps = {
  isShowTitle: false,
  children: null,
}

export default MobileLayout
