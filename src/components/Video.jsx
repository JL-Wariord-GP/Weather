import React, { useState } from 'react'
import ReactPlayer from 'react-player'


const Video = ({ iconImg, imgURL }) => {
  return (
    <div>
        <ReactPlayer
          url={VideoSunny}
        />
    </div>
  )
}

export default Video