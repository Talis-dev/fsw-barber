import Image from "next/image";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle} from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage  } from "./ui/avatar";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { FcGoogle } from "react-icons/fc"


const SidebarSheet = () => {
    return ( 

        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="border-b border-solid flex items-center justify-between">
            <Avatar className="h-12 w-12 ">
                    <AvatarImage src="https://cdn-icons-png.flaticon.com/512/4042/4042356.png"/>
                </Avatar>

                <div>
                  <p className="pr-9 font-bold text-x ">Olá, faça seu login!</p>
                 </div>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button size="icon">
                         <LogOutIcon/>
                        </Button>   
                    </DialogTrigger>
                    <DialogContent className="w-[90%] rounded-xl">
                        <DialogHeader>
                            <DialogTitle> Faça login na plataforma</DialogTitle>
                            <DialogDescription>Conecte-se usando sua conta Google</DialogDescription>
                        </DialogHeader>
                        <Button variant="outline" className="gap-2 font-bold">
                            <FcGoogle size={30}/>
                            Google
                        </Button>
                    </DialogContent>
                 </Dialog>

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