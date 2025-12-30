import React from 'react'
import { Link } from 'react-router-dom'
import useStore from '@/store/menu.store'

import {
  IoHome, IoCart, IoDocumentText, IoPerson,
  IoHomeOutline, IoCartOutline, IoDocumentTextOutline, IoPersonOutline
} from "react-icons/io5"

import { Button } from '@/components/ui/button'

export default function NavbarBottom() {
    const { menuClicked, setMenuClicked } = useStore()
    return (
        <>
            <footer className='sticky w-full bottom-0 left-0 z-100 shadow-[0_-1px_10px_0_rgba(0,0,0,0.2)] bg-white md:hidden'>
                <div className='flex items-center justify-between px-4 [&_Button]:rounded-md [&_Button]:w-15 [&_Button]:h-15 pb-5 text-muted-foreground'>
                    <Link to={'/'}> <Button variant='ghost' onClick={() => setMenuClicked('home')}>
                        {menuClicked == 'home'
                            ? <IoHome className='w-7! h-7!' />
                            : <IoHomeOutline className='w-7! h-7!' />
                        }
                    </Button> </Link>

                    <Link to={'/cart'}> <Button variant='ghost' onClick={() => setMenuClicked('cart')}>
                        {menuClicked == 'cart'
                            ? <IoCart className='w-7! h-7!' />
                            : <IoCartOutline className='w-7! h-7!' />
                        }
                    </Button> </Link>

                    <Link to={'/transaction'}> <Button variant='ghost' onClick={() => setMenuClicked('transaction')}>
                        {menuClicked == 'transaction'
                            ? <IoDocumentText className='w-7! h-7!' />
                            : <IoDocumentTextOutline className='w-7! h-7!' />
                        }
                    </Button> </Link>

                    <Link to={'/profile'}><Button variant='ghost' onClick={() => setMenuClicked('profile')}>
                        {menuClicked == 'profile'
                            ? <IoPerson className='w-7! h-7!' />
                            : <IoPersonOutline className='w-7! h-7!' />
                        }
                    </Button></Link>
                </div>
            </footer>

        </>
    )
}
