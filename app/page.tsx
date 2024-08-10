
import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge"
import { Avatar } from "./_components/ui/avatar";
import { AvatarImage } from "./_components/ui/avatar";


const Home = () => {
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
        {/*IMAGEM*/}
        <div className="relative h-[150px] w-full mt-6">
           <Image alt="Agende nos Melhores" 
           src="/banner-01.png" fill className="rounded-xl object-cover"/> 
        </div>
         {/*AGENDAMENTO*/}
         <div>
         <Card className="mt-6">
            
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
         </div>
         
      
    </div>
    
</div>

}
export default Home;
