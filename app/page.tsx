
import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";


const Home = () => {
return <div>
    {/*header */}
    <Header/>
    <div className="p-5">
      <h2 className="text-xl font-bold">Olá, Usuario</h2> 
      <p>Segunda-Feira, 05 de Agosto.</p>
        <div className="gap-2 mt-6 flex items-center ">
          <Input placeholder="Faça sua busca..."/>
          <Button>
            <SearchIcon/>
          </Button> 
        </div>
        <div className="relative h-[150px] w-full mt-6">
           <Image alt="Agende nos Melhores" 
           src="/banner-01.png" fill className="rounded-xl object-cover"/> 
        </div>
      
    </div>
    
</div>

}
export default Home;
