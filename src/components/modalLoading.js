import { Modal, Spin } from 'antd'
import styled from 'styled-components'

const CustomModal = styled(Modal)`
  .ant-modal-content {
    width: 100px;
    height: auto;
    margin: auto;
  }
`

const ModalLoading = () => (
  <CustomModal
    visible
    footer={null}
    centered
    closable={false}
    bodyStyle={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    }}
  >
    <Spin size="large" />
  </CustomModal>
)

export default ModalLoading
