import { useEffect, useRef } from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from '../configs/color'

const CustomModal = styled(Modal)`
  padding: 0; 
  overflow: hidden;
  width: 85% !important;

  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-content {
    background-color: transparent;
    box-shadow: none;
  }

  .ant-modal-close-x {
    width: auto;
    height: auto;
    line-height: inherit;
  }

  .ant-modal-close {
    background-color: ${colors.red};
    color: ${colors.white};
    border-radius: 50px;
    display: block;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
    padding: 10px;
    margin: 5px;
    box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
    -webkit-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
    -moz-box-shadow: 7px 6px 26px -6px rgba(0,0,0,0.45);
  }
`

const Video = styled.video`
  border-radius: 20px;
`

const VideoPlayer = ({ src, visible, onCancel }) => {
  const videoRef = useRef()

  const handleEvent = (e) => e.preventDefault()

  useEffect(() => {
    window.addEventListener('contextmenu', handleEvent)
    return () => window.removeEventListener('contextmenu', handleEvent)
  }, [])

  return (
    <CustomModal
      visible={visible}
      footer={null}
      centered
      destroyOnClose
      onCancel={() => {
        onCancel()
        const video = document.getElementById('vid')
        URL.revokeObjectURL(video.src)
      }}
    >
      <Video
        ref={videoRef}
        id="vid"
        width="100%"
        height="100%"
        controls
        controlsList="nodownload"
        oncontextmenu="return false;"
      >
        <source
          src={src}
        />
        Your browser does not support the video tag.
      </Video>
    </CustomModal>
  )
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
}

VideoPlayer.defaultProps = {
  visible: false,
  onCancel: () => {},
}

export default VideoPlayer
