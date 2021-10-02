import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from '../configs/color'

const Avatar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.themeColor};
  color: ${colors.white};
  border-radius: 100px;
  margin: 10px;
  width: 35px;
  height: 35px;
  justify-content: center;
  font-size: 16px;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Name = styled.div`
  max-width: 160px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const ProfileComponent = ({ name }) => {
  if (!name) return null
  return (
    <ProfileContainer>
      <Avatar>{name[0]}</Avatar>
      <Name>{name}</Name>
    </ProfileContainer>
  )
}

ProfileComponent.propTypes = {
  name: PropTypes.string,
}

ProfileComponent.defaultProps = {
  name: undefined,
}

export default ProfileComponent
