import React, { ReactNode, useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from './ui/button'

import Autoplay from "embla-carousel-autoplay"

export default function AdsCarousel() {
    const data = ['/images/ads-1.jpg', '/images/ads-2.jpg', '/images/ads-3.jpg']
    const [api, setApi] = useState<any>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <>
            <Carousel
                className='w-full'
                setApi={setApi}
                opts={{ align: 'start', loop: true, }}
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                ]}
            >
                <CarouselContent>
                    {data.map((val, i) => {

                        return (
                            <CarouselItem key={i}>
                                <img src={val} alt={val} className='w-full aspect-3/1 h-auto rounded-none' />
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
            </Carousel>

            <div className='flex justify-center mt-5 z-50'>
                <div className='relative flex gap-2 md:gap-3 w-fit bg-black/5 rounded-full p-2'>
                    {data.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => api?.scrollTo(i)}
                            className={`h-fit w-[0.40rem] md:w-[0.60rem] aspect-1/1 rounded-full transition cursor-pointer ${i === current ? 'bg-black/80' : 'bg-black/20'}`}
                        />
                    ))}
                </div>
            </div>

            {/* <Button onClick={() => alert(JSON.stringify(api))}>api</Button> */}
        </>
    )
}
