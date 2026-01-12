import { useState } from 'react'

import { CircleAlertIcon, XIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const AlertInfoPayment = () => {
    const [isActive, setIsActive] = useState(true)

    if (!isActive) return null

    return (
        <div className='max-w-[1920px] '>
            <div className='fixed w-full mt-5 z-50 px-4 md:px-8 lg:px-30'>
                <Alert className=' flex justify-between items-center w-full border border-[#b29c69] bg-[#fff5de]'>
                    <CircleAlertIcon />
                    <div className='flex-1 flex-col justify-center gap-1'>
                        {/* <AlertTitle>New message!</AlertTitle> */}
                        <AlertDescription className=' text-black'>
                            <span>
                                Payment on this project is a simulation and not real, can be done at
                                <Link to="https://simulator.sandbox.midtrans.com/" target="_blank">
                                    <Button variant={'link'} size={'sm'} className='pl-1 h-auto'>
                                        Simulator Midtrans
                                    </Button>
                                </Link>
                            </span>
                        </AlertDescription>
                    </div>
                    <button className='cursor-pointer' onClick={() => setIsActive(false)}>
                        <XIcon className='size-5' />
                        <span className='sr-only'>Close</span>
                    </button>
                </Alert>
            </div>
        </div>
    )
}

export default AlertInfoPayment

