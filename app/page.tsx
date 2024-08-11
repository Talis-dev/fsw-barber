
import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import {quickSearchOptions} from "./_constants/search"
import BookingItem from "./_components/booking-item";


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
           {quickSearchOptions.map(option =><Button 
           className=" gap-2 " variant="secondary" key={option.title}>
          <Image src={option.imageUrl} width={16} height={16} alt="cabelo"/>
            {option.title}
            </Button>)}


        </div>


        {/*IMAGEM*/}
        <div className="relative h-[150px] w-full mt-6">
           <Image alt="Agende nos Melhores" 
           src="/banner-01.png" fill className="rounded-xl object-cover"/> 
        </div>
         {/*AGENDAMENTO*/}
         <BookingItem/>

        <div>
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

    
</div>

}
export default Home;
