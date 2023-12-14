import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Router from 'next/router'
import { usePathname } from 'next/navigation'

const TopLoadingBar = () => {
  const [progress, setProgress] = useState(0)
  const path = usePathname()
  React.useEffect(() => {
    setProgress(200)
  }, [path])
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

export default TopLoadingBar