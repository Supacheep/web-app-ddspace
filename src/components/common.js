import styled from 'styled-components'
import { colors } from '../configs/color'
import { MOBILE_WINDOW_WIDTH } from '../constants/constantsValue'

export const HeaderLogo = styled.img`
  width: 70px;
  height: auto;
  margin: 10px;
`

export const TitleH3 = styled.h3`
  text-align: center;
  color: ${colors.themeColor};
  font-size: 20px;
  white-space: break-spaces;
  margin-top: 15px;
  margin-bottom: 20px;
  h4 {
    margin: 5px 0;
  }
  @media screen and (max-width: ${MOBILE_WINDOW_WIDTH}px) {
    font-size: 18px;
  }
`

export const FullImageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${colors.themeGradient};
  margin-top: -65px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ customStyle }) => customStyle}
`
