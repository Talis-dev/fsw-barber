import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { notFound } from "next/navigation";
import { authOptions } from "../_lib/auth";
import BookingItem from "../_components/booking-item";


const Bookings = async () => {
    const session = await getServerSession(authOptions)

    if(!session?.user){
        return notFound();
    }
    const Bookings = await db.booking.findMany({
        where:{
            userId: (session.user as any).id,
        },
        include: {
            service: {
                include: {
                    barbershop:true}
            }
        }
    })

 return ( 
        <>
        <Header/>
        <div className="p-5">
            <h1 className="text-xl font-bold">Agendamentos</h1>
            {Bookings.map((booking) =>(
             <BookingItem key={booking.id} booking={booking} />
        ))}

        </div>
        </>
     );
}
 
export default Bookings;