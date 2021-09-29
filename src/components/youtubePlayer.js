import { useMemo } from 'react'

const YoutubePlayer = ({
  videoID, autoplay, mute, loop,
}) => {
  const src = useMemo(() => {
    let resultUrl = `https://www.youtube.com/embed/${videoID}?`
    if (autoplay) {
      resultUrl = `${resultUrl}&autoplay=1`
    }
    if (mute) {
      resultUrl = `${resultUrl}&mute=1`
    }
    if (loop) {
      resultUrl = `${resultUrl}&loop=1&playlist=6FIJfRINVLE`
    }
    return resultUrl
  }, [autoplay, mute, loop])

  return (
    <iframe
      src={src}
      frameBorder="0"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}

export default YoutubePlayer
