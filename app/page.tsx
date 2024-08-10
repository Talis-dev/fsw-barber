
import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge"
import { Avatar } from "./_components/ui/avatar";
import { AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";


const Home = async () => {
    const barbershops = await db.barbershop.findMany({}) // caprtura nome das barbearia no db
    const popularBarbershops = await db.barbershop.findMany({
        orderBy:{
            name:'desc',
        }
    })

return <div>
    {/*header */}
    <Header/>
     {/*TEXTO*/}
    <div className="p-5">
      <h2 className="text-xl font-bold">Olá, Usuario</h2> 
      <p>Segunda-Feira, 05 de Agosto.</p>

       {/*BUSCA*/}
        <div className="gap-2 mt-6 flex items-center ">
          <Input placeholder="Faça sua busca..."/>
          <Button>
            <SearchIcon/>
          </Button> 
        </div>
        {/*BUSCA RAPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden " >
            <Button className=" gap-2 " variant="secondary">
                <Image src="/cabelo.svg" width={16} height={16} alt="cabelo"/>
                Cabelo
            </Button>

            <Button className=" gap-2 " variant="secondary">
                <Image src="/barba.svg" width={16} height={16} alt="cabelo"/>
                Barba
            </Button>

            <Button className=" gap-2 " variant="secondary">
                <Image src="/acabamento.svg" width={16} height={16} alt="cabelo"/>
                Acabamento
            </Button>

            <Button className=" gap-2 " variant="secondary">
                <Image src="/sobrancelha.svg" width={16} height={16} alt="cabelo"/>
                Sobrancelha
            </Button>

            <Button className=" gap-2 " variant="secondary">
                <Image src="/massagem.svg" width={16} height={16} alt="cabelo"/>
                Massagem
            </Button>

            <Button className=" gap-2 " variant="secondary">
                <Image src="/hidratacao.svg" width={16} height={16} alt="cabelo"/>
                Hidratação
            </Button>
        </div>


        {/*IMAGEM*/}
        <div className="relative h-[150px] w-full mt-6">
           <Image alt="Agende nos Melhores" 
           src="/banner-01.png" fill className="rounded-xl object-cover"/> 
        </div>
         {/*AGENDAMENTO*/}
         <h2 className="mt-6 mb-3 uppercase text-xs font-bold text-gray-400
         " >Agendamentos</h2>
         <div>
         <Card>
            
            <CardContent className="flex justify-between p-0">
                {/*div esquerda*/} 
                <div className="flex flex-col gap-2 py-5 pl-5">
                    <Badge className="w-fit" >Confirmado</Badge>
                    <h3 className="font-semibold" >Corte de Cabelo</h3>
                
                    <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src="https://cdn-icons-png.flaticon.com/512/4042/4042356.png"/>
                    </Avatar>
                    <p className="text-sm" >Barbearia name</p>

                    </div>
                </div>
               {/*div direita*/} 
             <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5" >
                <p className="text-sm" > Agosto </p>
                <p className="text-2xl" >05</p>
                <p className="text-sm" >20:00</p>

               </div>
            </CardContent>
         </Card>  

          <h2 className="mt-6 mb-3 uppercase text-xs font-bold text-gray-400
         " >Recomendados</h2> 

         <div className=" flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden ">
            {barbershops.map((barbershop) => (
         <BarbershopItem  key={barbershop.id} barbershop={barbershop}/> ))}
 
         </div>
        


         <h2 className="mt-6 mb-3 uppercase text-xs font-bold text-gray-400
         " >Populares</h2> 
         
         <div className=" flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden ">
            {popularBarbershops.map((barbershop) => (
         <BarbershopItem  key={barbershop.id} barbershop={barbershop}/> ))}
 
         </div>
         


         </div>
         
      
    </div>
    <footer>
      <Card className="mt-5 ">
            <CardContent className="px-5 py-6">
                <p className= "text-xs text-gray-400 ">
                    @2024 Copyright 
                    <span className="font-bold"> FSW Barber </span> </p> 
                
            </CardContent>
         </Card>  
    </footer>
    
</div>

}
export default Home;
