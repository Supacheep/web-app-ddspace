import { useEffect, useRef, useState } from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'
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

  // useEffect(() => {
  //   const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
  //   if (videoRef.current && MediaSource.isTypeSupported(mimeCodec)) {
  //     const myMediaSource = new MediaSource()
  //     const url = URL.createObjectURL(myMediaSource)

  //     videoRef.current.src = url

  //     myMediaSource.addEventListener('sourceopen', () => {
  //       const videoSourceBuffer = myMediaSource.addSourceBuffer(mimeCodec)

  //       videoSourceBuffer.addEventListener('error', console.log)

  //       // this is just an express route that return an mp4 file using `res.sendFile`
  //       fetch('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4').then((response) => response.arrayBuffer()).then((videoData) => {
  //         videoSourceBuffer.appendBuffer(videoData)
  //       })
  //     })
  //   }
  // }, [])

  // const [source, setSource] = useState(null)
  // useEffect(async () => {
  //   const video = document.getElementById('vid')
  //   fetch(src)
  //     .then((response) => response.arrayBuffer()).then((videoData) => {
  //       const blob = new Blob([new Uint8Array(videoData)], { type: 'video/mp4' })
  //       const url = URL.createObjectURL(blob)
  //       video.src = url
  //     })
  // }, [])

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
