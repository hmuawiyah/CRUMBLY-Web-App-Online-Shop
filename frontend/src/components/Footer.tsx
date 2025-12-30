import React from 'react'
import { Icon } from "@iconify/react"
import { AiFillFacebook, AiFillTikTok, AiFillInstagram } from "react-icons/ai";
import { FaSquareFacebook, FaSquareXTwitter, FaSquareInstagram, FaTiktok } from "react-icons/fa6"

export default function Footer() {
    return (
        <div className='w-full bg-gray-200'>
            <div className='max-w-[1920px] mx-4 md:mx-8 lg:mx-30 py-10'>
                <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-6 md:col-span-3'>
                        <p className='text-sm font-semibold mb-2'>Our Store</p>
                        <p className='text-sm opacity-85 w-35 md:w-50'>Jl. Senopati VIII No. 123, Kebayoran Baru, Jakarta Selatan</p>
                    </div>
                    <div className='col-span-6 md:col-span-3'>
                        <p className='text-sm font-semibold mb-2'>Open Hours</p>
                        <p className='text-sm opacity-85'>Mon–Fri: 09.00 – 21.00</p>
                        <p className='text-sm opacity-85'>Sat–Sun: 07.00 – 23.00</p>
                    </div>
                    <div className='col-span-6 md:col-span-3'>
                        <p className='text-sm font-semibold mb-2'>Payment Methods</p>
                        <p className='opacity-85 flex items-center gap-2'>
                            <Icon icon="logos:visa" className='text-sm' />
                            <Icon icon="logos:mastercard" className='text-2xl' />
                            <Icon icon="logos:paypal" className='text-2xl' />
                            <Icon icon="logos:stripe" className='text-xl' />
                        </p>
                    </div>
                    <div className='col-span-6 md:col-span-3'>
                        <p className='text-sm font-semibold mb-2'>Social Media</p>
                        <p className=' flex items-center gap-1'>
                            <FaSquareFacebook className='text-2xl' />
                            <FaSquareXTwitter className='text-2xl' />
                            <FaSquareInstagram className='text-2xl' />
                            <AiFillTikTok className='text-[1.7rem]' />
                        </p>
                    </div>
                </div>

                <div className='flex-col md:flex-row flex justify-start md:justify-between items-start md:items-end mt-20'>
                    <p className='text-4xl font-bold -tracking-[1px] text-primary'>Crumbly</p>
                    <p className='text-sm opacity-80 mt-2 md:mt-0'>@ 2025 Sample Project Web App Online Shop</p>
                </div>
            </div>
        </div>
    )
}
