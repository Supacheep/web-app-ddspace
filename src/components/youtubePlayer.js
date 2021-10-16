import { useMemo } from 'react'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  .youtube-container {
    width: 100%;
    height: 100%; 
    align-items: stretch;
  }

  iframe {
    width: 100%;
    height: 100%; 
  }
`

const YoutubePlayer = ({
  videoID, autoplay, mute, loop, onStateChange, hideUi,
}) => {
  const playerVars = useMemo(() => {
    const vars = {}
    if (autoplay) {
      Object.assign(vars, { autoplay: 1 })
    }
    if (mute) {
      Object.assign(vars, { mute: 1 })
    }
    if (loop) {
      Object.assign(vars, { loop: 1, playlist: videoID })
    }
    if (hideUi) {
      Object.assign(vars, { controls: 0, frameborder: 0, showinfo: 0 })
    }
    return vars
  }, [autoplay, mute, loop])

  return (
    <Container>
      <YouTube
        containerClassName="youtube-container"
        videoId={videoID}
        onStateChange={onStateChange}
        opts={{ playerVars }}
      />
    </Container>
  )
}

YoutubePlayer.propTypes = {
  videoID: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
  mute: PropTypes.bool,
  loop: PropTypes.bool,
  hideUi: PropTypes.bool,
  onStateChange: PropTypes.func,
}

YoutubePlayer.defaultProps = {
  autoplay: false,
  mute: false,
  loop: false,
  hideUi: false,
  onStateChange: () => {},
}

export default YoutubePlayer
