import {
  Button,
  Modal,
  Form,
  Input,
  Alert,
} from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { PATTERN_EMAIL } from '../constants/validateValue'
import { TitleH3 } from './common'

const Container = styled.div`
  text-align: center;
`

const LoginButton = styled(Button)`
  font-weight: bold;
  height: 40px;
  padding: 0 30px;
  font-size: 18px;
`

const LogoContainer = styled.div`
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`

const Logo = styled.img`
  width: 15%;
  margin: 10px;
`

const CustomInput = styled(Input)`
  font-size: 18px;
`

const CustomInputPassword = styled(Input.Password)`
  font-size: 18px;
`

const ModalLogin = ({ visible, onFinish, error }) => {
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
          <CustomInputPassword placeholder="Password" maxLength="12" />
        </Form.Item>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 10 }} />}
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
  error: PropTypes.string,
}

ModalLogin.defaultProps = {
  visible: false,
  onFinish: () => {},
  error: '',
}

export default ModalLogin
