import {
  Input,
  Button,
  Form,
  Modal,
} from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { TitleH3 } from '../../../src/components/common'

const CustomInput = styled(Input)`
  font-size: 18px;
`

const RegisterButton = styled(Button)`
  font-weight: bold;
  height: 40px;
  padding: 0 30px;
  font-size: 18px;
  margin: auto;
`

const Container = styled.div`
  text-align: center;
`

const ModalRegister = ({ visible, onClose, onFinish }) => {
  const itemBaseProps = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    rules: [{ required: true }],
  }
  return (
    <Modal
      visible={visible}
      footer={null}
      centered
      onCancel={onClose}
      destroyOnClose
    >
      <TitleH3>Add Member Profile</TitleH3>
      <Form
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="Email"
          {...itemBaseProps}
        >
          <CustomInput />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          {...itemBaseProps}
        >
          <CustomInput />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          {...itemBaseProps}
        >
          <CustomInput />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Lastname"
          {...itemBaseProps}
        >
          <CustomInput />
        </Form.Item>
        <Container>
          <RegisterButton type="primary" htmlType="submit">
            REGISTER
          </RegisterButton>
        </Container>
      </Form>
    </Modal>
  )
}

ModalRegister.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onFinish: PropTypes.func,
}

ModalRegister.defaultProps = {
  visible: false,
  onClose: () => {},
  onFinish: () => {},
}

export default ModalRegister
