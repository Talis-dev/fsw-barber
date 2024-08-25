"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInDialog from "./sign-in-dialog";

const SidebarSheet = () => {
  const { data } = useSession();
  const handleLogoutClick = () => signOut();

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="py-5 border-b border-solid flex items-center justify-between">
        {data?.user ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ">
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>
            <div>
              <p className="font-bold text-x ">{data?.user?.name}</p>
              <p className="text-sm text-gray-400">{data?.user?.email}</p>
            </div>
          </div>
        ) : (
          <>
            <Avatar className="h-12 w-12 ">
              <AvatarImage src="https://cdn-icons-png.flaticon.com/512/4042/4042356.png" />
            </Avatar>

            <div>
              <h2 className="pr-9 font-bold text-x ">Olá, faça seu login!</h2>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>

              <SignInDialog />
              
            </Dialog>
          </>
        )}
      </div>

      <div className="py-5 gap-2 flex flex-col border-b border-solid">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Inicio
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost" asChild>
          <Link href={"/bookings"}>
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>
      </div>

      <div className="py-5 gap-2 flex flex-col border-b border-solid">
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {data?.user && (
      <div className="py-5 gap-2 flex flex-col ">
        <Button
          className="justify-start gap-2"
          variant="ghost"
          onClick={handleLogoutClick}
        >
          <LogOutIcon size={18} />
          Sair da Conta
        </Button>
      </div>        
      )}

    </SheetContent>
  );
};

export default SidebarSheet;
