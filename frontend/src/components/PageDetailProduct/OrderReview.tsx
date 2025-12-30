import { getInitial } from '@/helper/simpleFn'
import React from 'react'

import { FaStar } from 'react-icons/fa6'

export type OrderReviewProps = {
    name: string,
    star: number,
    date: string,
    reviewComment: string
}

export default function OrderReview({ name, star, date, reviewComment }: OrderReviewProps) {    
    return (
        <>
            <hr className="flex border border-gray-200 my-3" />
            <div className='flex justify-between px-4'>
                <div className='flex items-start'>
                    <div className='flex justify-center items-center w-10 h-fit aspect-square rounded-full bg-secondary text-sm md:text-base'>{getInitial(name)}</div>
                    <div className='ml-2'>
                        <div className='text-lg leading-none'>{name}</div>
                        <div className='text-xs flex gap-1 mt-1'>
                            {[...Array(star)].map((_, i) => (
                                <FaStar key={i} className="text-yellow-400" />
                            ))}
                            {[...Array(5-star)].map((_, i) => (
                                <FaStar key={i} className="text-gray-400" />
                            ))}

                        </div>
                    </div>
                </div>
                <div className='text-sm md:text-base opacity-50'>{date}</div>
            </div>
            <div className='px-4'>
                <div className='text-base md:text-lg'>{reviewComment}</div>
            </div>
        </>
    )
}
