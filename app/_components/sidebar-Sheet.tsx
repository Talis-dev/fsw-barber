import Image from "next/image";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle} from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage  } from "./ui/avatar";
import Link from "next/link";



const SidebarSheet = () => {
    return ( 

        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="border-b border-solid flex items-center">
            <Avatar className="h-12 w-12 ">
                    <AvatarImage src="https://cdn-icons-png.flaticon.com/512/4042/4042356.png"/>
                </Avatar>

                <div>
                  <p className="px-2 font-bold text-xl">User Name</p>
                  <p className="px-2  text-xs">username@mail.com</p>
                 </div>
            </div>
            


            <div className="py-5 gap-2 flex flex-col border-b border-solid">
                
                    <SheetClose asChild>
                        <Button className="justify-start gap-2" variant="ghost" asChild>
                         <Link href="/" >
                          <HomeIcon size={18} />
                            Inicio
                         </Link>
                        </Button>   
                    </SheetClose>
                
                <Button className="justify-start gap-2" variant="ghost">
                    <CalendarIcon size={18} />
                    Agendamentos</Button>
            </div>

            <div className="py-5 gap-2 flex flex-col border-b border-solid">
                {quickSearchOptions.map((option) => (
                    <Button key={option.title} className="justify-start gap-2" variant="ghost">
                        <Image alt={option.title} src={option.imageUrl} height={18} width={18} />
                        {option.title}</Button>
                ))}
            </div>
            <div className="py-5 gap-2 flex flex-col ">
                <Button className="justify-start gap-2" variant="ghost">
                    <LogOutIcon size={18} />
                    Sair da Conta</Button>
            </div>


        </SheetContent>
   
     );
}
 
export default SidebarSheet ;