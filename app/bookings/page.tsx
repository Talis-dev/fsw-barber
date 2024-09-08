import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { notFound } from "next/navigation";
import { authOptions } from "../_lib/auth";
import BookingItem from "../_components/booking-item";
import { getConfirmedBookings } from "../_data/get-confirmed-bookings";
import { getConcludedBookings } from "../_data/get-concluded-bookings";


const Bookings = async () => {
    const session = await getServerSession(authOptions)

    if(!session?.user){
        return notFound();
    }
    const confirmedBookings = await getConfirmedBookings()
    const concludedBookings = await getConcludedBookings()

 return ( 
        <>
        <Header/>
        <div className="p-5 space-y-3">
            <h1 className="text-xl font-bold">Agendamentos</h1>
            {confirmedBookings.length == 0 && concludedBookings.length == 0 && (
                <p className="text-gray-400">Você não tem Agendamentos. </p>
            )}

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