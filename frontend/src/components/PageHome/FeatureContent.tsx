import React, { ReactNode } from 'react'

interface FeatureContentProps {
  icon: ReactNode,
  text1: string,
  text2: string
}


export default function FeatureContent({ icon, text1, text2 }: FeatureContentProps) {
  return (
    <div className='w-[45%] md:w-1/2'>

      <div className='flex items-center justify-start md:justify-center'>
        <span className='mr-3'>{icon}</span>
        <div className='flex-col [&_div]:leading-4.5 md:[&_div]:leading-5.5'>
          <div className='text-xs md:text-lg font-semibold'>{text1}</div>
          <div className='text-xs md:text-lg font-semibold'>{text2}</div>
        </div>
      </div>

    </div>
  )
}
