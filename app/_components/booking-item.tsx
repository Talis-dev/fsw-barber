import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"


// TODO: receber agendamento como prop

const BookingItem = () => {
    return ( 
        <>
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
         </div>
        </>
     );
}

export default BookingItem;