import {
  Button,
  Modal,
  Form,
  Input,
} from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from '../configs/color'
import { PATTERN_EMAIL } from '../constants/validateValue'
import { TitleH3 } from './common'

const Container = styled.div`
  text-align: center;
`

const LoginButton = styled(Button)`
  font-weight: bold;
`

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Logo = styled.img`
  width: 15%;
  height: auto;
  margin: 10px;
`

const CustomInput = styled(Input)`
  font-size: 18px;
`

const ModalLogin = ({ visible, onFinish }) => {
  const emailValidator = async (rule, value) => {
    if (!value) {
      return Promise.reject('Please input your email')
    }
    if (!value.match(PATTERN_EMAIL)) {
      return Promise.reject('Invalid email')
    }
    return Promise.resolve()
  }
  return (
    <Modal
      visible={visible}
      closable={false}
      footer={null}
      centered
    >
      <Form
        onFinish={onFinish}
      >
        <LogoContainer>
          <Logo
            src="/images/LogoThPRS-01.svg"
            alt="LogoThPRS"
          />
          <Logo
            src="/images/LogoThSAPS_whole.svg"
            alt="LogoThPRS"
          />
        </LogoContainer>
        <TitleH3>
          The 31
          <sup>th</sup>
          {' '}
          {'Annual Meeting of\nThe Society of Plastic and Reconstructive Surgeons of Thailand\nThe Society of Aesthetic Plastic Surgeons of Thailand'}
        </TitleH3>
        <Form.Item
          name="email"
          rules={[{ validator: emailValidator }]}
        >
          <CustomInput placeholder="Email Address" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password' }]}
        >
          <CustomInput type="password" placeholder="Password" />
        </Form.Item>
        <Container>
          <LoginButton type="primary" htmlType="submit">
            LOGIN
          </LoginButton>
        </Container>
      </Form>
    </Modal>
  )
}

ModalLogin.propTypes = {
  visible: PropTypes.bool,
  onFinish: PropTypes.func,
}

ModalLogin.defaultProps = {
  visible: false,
  onFinish: () => {},
}

export default ModalLogin
