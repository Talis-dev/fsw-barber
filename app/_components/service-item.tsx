"use client";
import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { addDays, format, set} from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { getBookings } from "../_actions/get-bookings";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop,'name'>
}

const TIME_LIST = [
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];
const getTimelist = (bookings: Booking[]) =>{
    return TIME_LIST.filter((time) => {
   const hour = Number(time.split(":")[0])
   const minutes = Number(time.split(":")[1])

   const hasbookingOnCurrentTime = bookings.some(
    (booking) =>
        booking.date.getHours() == hour &&
        booking.date.getMinutes() == minutes,
   )
   if (hasbookingOnCurrentTime){
    return false
   }
   return true

    })

}


const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const {data} = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

 const [dayBookings, setDayBookings] = useState<Booking[] >([])
 useEffect(()=>{
    const fetch = async () => {
        if (!selectedDay) return
        const bookings = await getBookings({
            date: selectedDay,
            serviceId: service.id,
        })
        setDayBookings(bookings)
    }
    fetch()
 })
 const[bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  const handleBookingSheetOpenChange = () =>{
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

 const handleTimeSelect = (time: string | undefined) => {
    setSelectedTime(time);
  };

const handleCreateBooking = async () => {
    try {
        if(!selectedDay || !selectedTime) return;

        const hour = Number(selectedTime.split(":")[0]) //to list> ["09":"00"]
        const minute = Number(selectedTime.split(":")[1])
        const newdate = set(selectedDay,{
        minutes: minute,
        hours: hour,   
        })
    
        await createBooking({
            serviceId: service.id,
            userId: (data?.user as any).id,
            date: newdate,
        })
        handleBookingSheetOpenChange()
        toast.success("Reservar criada com sucesso !")
    } catch (error) {
        console.error(error)
        toast.error("Erro ao criar Reserva !")
    }
    

}
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/*IMAGEM */}
        <div
          className="relative min-h-[110px] min-w-[110px]
            max-h-[110px] max-w-[110px]"
        >
          <Image
            alt={service.name}
            src={service.imageUrl}
            fill
            className="object-cover rounded-lg "
          />
        </div>
        {/*DIREITA */}
        <div className=" space-y-2">
          <h3 className=" font-semibold">{service.name}</h3>
          <p className=" text-sm text-gray-400 ">{service.description}</p>
          {/*PREÇO E BOTAO */}
          <div className="flex item-center justify-between ">
            <p className="text-sm font-bold text-primary ">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Sheet 
            open={bookingSheetIsOpen}
            onOpenChange={handleBookingSheetOpenChange}>
            
                <Button variant="secondary" 
                size="sm"
                onClick={()=> setBookingSheetIsOpen(true) }>
                  Reservar
                </Button>
              <SheetContent>
                <SheetHeader>Fazer Reserva</SheetHeader>
                <div className="py-5 border-b border-solid" >
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    fromDate={addDays(new Date(),1)}
                  />
                </div>
                {selectedDay && (
                <div className="flex overflow-x-auto p-5 gap-3 border-b border-solid
                [&::-webkit-scrollbar]:hidden ">
                    {getTimelist(dayBookings).map((time) => <Button
                    key={time}
                    variant={selectedTime === time? "default" : "outline" }
                    className="rounded-full "
                    onClick={() => handleTimeSelect(time)}>
                        {time}</Button>)}
                </div>
                )}

                {selectedTime && selectedDay &&  (
                    <div className="p-5">
                      <Card className="my-5">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex justify-between items-center ">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(Number(service.price))}
                            
                            </p>    
                    </div>
                    <div className="flex justify-between items-center ">
                        <h2 className="text-sm text-gray-400">Data</h2>
                        <p className="text-sm">
                            {format(selectedDay,"d 'de' MMMM",{locale:ptBR})}
                            
                            </p>    
                    </div>

                    <div className="flex justify-between items-center ">
                        <h2 className="text-sm text-gray-400">Horário</h2>
                        <p className="text-sm">
                            {selectedTime}
                            
                            </p>    
                    </div>

                    <div className="flex justify-between items-center ">
                        <h2 className="text-sm text-gray-400">Barbearia</h2>
                        <p className="text-sm">
                            {barbershop.name}
                            </p>    
                    </div>
                  </CardContent>
                  </Card>
                    </div>

                )}
                <SheetFooter className="p-x5 mt-5">
                    <SheetClose asChild>
                    <Button onClick={handleCreateBooking}
                    type="submit"
                    disabled={!selectedDay || !selectedTime}>Confirmar</Button>
                    </SheetClose>
                </SheetFooter>
                
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
