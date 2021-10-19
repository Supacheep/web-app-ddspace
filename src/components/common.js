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
  font-size: 20px;
  white-space: break-spaces;
  margin-top: 15px;
  margin-bottom: 20px;
`

export const FullImageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.themeColor};
  margin-top: -65px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ customStyle }) => customStyle}
`
