import {
  Button,
  Modal,
  Form,
  Input,
} from 'antd'
import styled from 'styled-components'
import { colors } from '../configs/color'

const Container = styled.div`
  text-align: center;
`

const LoginButton = styled(Button)`
  font-weight: bold;
`

const Title = styled.h3`
  text-align: center;
  color: ${colors.themeColor};

  font-size: 20px;

  @media screen and (min-width: 1600px) {
    font-size: 22px;
  }
  @media screen and (max-width: 991px) {
    font-size: 18px;
  }
  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
`

const ModalLogin = ({ visible, onFinish }) => (
  <Modal
    visible={visible}
    closable={false}
    footer={null}
    centered
  >
    <Form
      onFinish={onFinish}
    >
      <Title>
        The 31
        <sup>th</sup>
        {' '}
        {'Annual Meeting of The Society of\nPlastic and Reconstructive Surgeons of Thailand\nThe Society of Aesthetic Plastic Surgeons of Thailand'}
      </Title>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input placeholder="Email Address" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Container>
        <LoginButton type="primary" htmlType="submit">
          LOGIN
        </LoginButton>
      </Container>
    </Form>
  </Modal>
)

export default ModalLogin
