'use client'


import { Skeleton } from '@/components/ui/skeleton'
import { HandleRequest } from '@/helper/handleRequest'
import { useParams } from 'next/navigation'
import React from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'


export default function SingleProject({ params }: any) {

  const [data, setData] = React.useState<any>()
  const [loading, setloading] = React.useState(true)
  const [congratulation, setCongratulation] = React.useState(false)
  const { width, height } = useWindowSize()

  const param = useParams()


  const SingleProjectView = async () => {
    try {
      const data = await HandleRequest('get', `/projects/${param.link}`)
      const projectId: any = localStorage.getItem('projectIds')
      const index = projectId.indexOf(data.data._id);
      if (index === -1) {
        const storedIds: string[] = JSON.parse(localStorage.getItem("projectIds") ?? "[]") || [];
        storedIds.push(data?.data?._id);
        localStorage.setItem("projectIds", JSON.stringify(storedIds));
      }

      setTimeout(() => {
        setData(data.data)
        setloading(false)
      }, 1000);
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {

    if (window.location.search) {
      setCongratulation(true)
      setTimeout(() => {
        setCongratulation(false)
      }, 5000);
    }
  }, [])

  React.useEffect(() => {
    SingleProjectView()
  }, [])
  return (
    <div className='max-w-5xl  py-12 m-3 lg:m-auto'>
      {
        congratulation &&
        <Confetti
          width={width}
          height={height}
        />
      }
      {
        loading ?
          <div className="card flex max-w-5xl lg:p-12 shadow-lg flex-col lg:flex-row p-5">
            <Skeleton className="lg:h-80 h-56 max-w-3xl w-full rounded" />
            <div className="space-y-2 p-6">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
          :
          <div className='card flex max-w-5xl lg:p-12 shadow-lg flex-col lg:flex-row p-5'>
            <div className='lg:w-[36rem] w-full'>
              <img className='w-full rounded object-contain h-full lg:h-[25rem]' src={data?.image} alt="" />
            </div>
            <div className='p-6'>
              <h1 className='text-3xl font-semibold capitalize'>
                {data?.projectName}
              </h1>
              <h1>
                {data?.projectType}
              </h1>
              <h1>
                {data?.prompt}
              </h1>
            </div>
          </div>
      }
    </div>
  )
}
