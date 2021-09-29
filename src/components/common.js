import styled from 'styled-components'
import { colors } from '../configs/color'

export const HeaderLogo = styled.img`
  width: 40px;
  height: auto;
  margin: 10px;
`

export const TitleH3 = styled.h3`
  text-align: center;
  color: ${colors.themeColor};
  font-size: 16px;
  white-space: break-spaces;
  margin-top: 15px;
  margin-bottom: 20px;

  @media screen and (min-width: 1600px) {
    font-size: 16px;
  }
  @media screen and (max-width: 991px) {
    font-size: 14px;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`
