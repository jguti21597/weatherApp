import { MenuIcon, User } from 'lucide-react'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'

const Navbar = () => {
    return (
        <div className='flex justify-between'>
            <Sheet >
                <SheetTrigger className=" text-white hover:cursor-pointer"><MenuIcon size={45} /></SheetTrigger>
                <SheetContent side={"left"}>
                    <SheetHeader>
                        <SheetTitle>Navigation</SheetTitle>
                        <SheetDescription>
                            Other pages..
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            {/* <Button size={"lg"}><User className='w-[2rem]' /></Button> */}
        </div>
    )
}

export default Navbar