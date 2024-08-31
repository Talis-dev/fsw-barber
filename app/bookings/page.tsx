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
    const confirmedBookings = await db.booking.findMany({
        where:{
            userId: (session.user as any).id,
            date: { gte: new Date(),
            }
        },
        include: {
            service: {
                include: {
                    barbershop:true}
            }
        },
        orderBy:{
            date: "asc"
        }
    })

    const concludedBookings = await db.booking.findMany({
        where:{
            userId: (session.user as any).id,
            date: {
                lt: new Date()
            }
        },
        include: {
            service: {
                include: {
                    barbershop:true}
            }
        },
      orderBy:{
            date: "desc"
        }
    })

 return ( 
        <>
        <Header/>
        <div className="p-5 space-y-3">
            <h1 className="text-xl font-bold">Agendamentos</h1>

          {confirmedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 uppercase text-xs font-bold text-gray-400">
            Confirmados
            </h2>          
            {confirmedBookings.map((booking) =>(
             <BookingItem key={booking.id} booking={booking} />
        ))}          
          </>
          )}

        {concludedBookings.length > 0 && (
            <>
            <h2 className="mt-6 mb-3 uppercase text-xs font-bold text-gray-400">
            Finalizados
          </h2>
          {concludedBookings.map((booking) =>(
             <BookingItem key={booking.id} booking={booking} />
            ))}
            </>
             )}

    </div>
        </>
     );
}
 
export default Bookings;