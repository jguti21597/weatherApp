import { MenuIcon, User } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'

const Navbar = () => {
    return (
        <div className='flex justify-between'>
            <Sheet >
                <SheetTrigger className=" text-white hover:cursor-pointer"><MenuIcon size={35} /></SheetTrigger>
                <SheetContent side={"left"}>
                    <SheetHeader>
                        <SheetTitle>Navigation</SheetTitle>
                        <SheetDescription>
                            Other pages..
                            <Link href="/map">
                                <p>Map</p>
                            </Link>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            {/* <Button size={"lg"}><User className='w-[2rem]' /></Button> */}
        </div>
    )
}

export default Navbar