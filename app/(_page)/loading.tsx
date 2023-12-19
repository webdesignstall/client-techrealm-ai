"use client"

import React from 'react'
import LoadingBar from 'react-top-loading-bar'


const Loading = () => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    setProgress(400)
  }, [])
  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={500}
      />
    </div>
  )
}

export default Loading