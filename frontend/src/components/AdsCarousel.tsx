import React, { ReactNode } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function AdsCarousel() {
    const data = ['Image 1', 'Image 2', 'Image 3']
    return (
        <Carousel className='w-full' opts={{ align: "start", loop: true, }}>
            <CarouselContent>
                {data.map((val, i) => {

                    return (
                        <CarouselItem key={i}>
                            <div className='flex items-center justify-center w-full aspect-3/1 h-auto bg-gray-400 text-white rounded-none text-2xl'>{val}</div>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
        </Carousel>
    )
}
