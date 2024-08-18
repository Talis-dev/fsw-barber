import Image from "next/image";
import {Card, CardContent } from "./ui/card"
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import Link from "next/link";
import SlidebarSheet from "./sidebar-Sheet";



const Header = () => (<Card>
    <CardContent className="flex flex-row itens-center justify-between p-5">
       <Link href="/">
        <Image alt="Fsw barber" src="/Logo1.svg" height={25} width={130} 
        className="py-2"/>
        </Link>

        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                    <MenuIcon />
                </Button>
            </SheetTrigger>
           <SlidebarSheet/>
        </Sheet>
    </CardContent>
</Card>)
 
export default Header;