import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopPageProps{
    searchParams:{
        search?: string
    }
}

const BarbershopPage = async ({searchParams} : BarbershopPageProps) => {
   const barbershops = await db.barbershop.findMany({
    where:{
        name:{
            contains: searchParams?.search,
        mode: "insensitive",
        },
    },
   })
   
    return <div>
        <Header/>
        <div className="my-6 px-4">
           <Search/> 
        </div>
        
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Resultados para &quot; {searchParams.search} &quot;
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {barbershops.map((barbershop) =>(
                    <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
                ))}

            </div>
    </div>
    
}
 
export default BarbershopPage;