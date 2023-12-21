import React, { Suspense } from 'react'
import CreateProject from '@/components/Project/CreateProject'
import ProjectList from '@/components/Project/ProjectList'

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Home page',
  description: '...',
}


export default function Homepage() {
  return (
    <div>
      <div>
        <CreateProject />
      </div>
      <div>
        <ProjectList />
      </div>
    </div >
  )
}
