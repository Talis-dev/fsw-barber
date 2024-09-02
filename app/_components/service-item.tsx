"use client";
import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { isPast, isToday, set } from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { getBookings } from "../_actions/get-bookings";
import { Dialog } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";
import BookingSummary from "./booking-summary";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
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
  "18:00",
  "18:30",
  "19:00",  
  "19:30",  
];

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimelist = ({bookings, selectedDay}: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);

    const timeIsOnThePast = isPast(set(new Date(),{hours: hour, minutes}))
    if (timeIsOnThePast && isToday(selectedDay)){
      return false
    }

    const hasbookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() == hour && booking.date.getMinutes() == minutes
    );
    if (hasbookingOnCurrentTime) {
      return false;
    }
    return true;
  });
};

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [SignInDialogIsOpen, setSignInDialogIsOpen] = useState(false);
  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );

  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return;
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };
    fetch();
  });

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return
    return set(selectedDay,{
      hours: Number(selectedTime.split(":")[0]),
      minutes: Number(selectedTime.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

  const handleBooingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true);
    }
    return setSignInDialogIsOpen(true);
  };

  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBookings([]);
    setBookingSheetIsOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelect = (time: string | undefined) => {
    setSelectedTime(time);
  };

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) return;



      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      });
      handleBookingSheetOpenChange();
      toast.success("Reservar criada com sucesso !");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar Reserva !");
    }
  };

    const timelist = useMemo(()=>{
      if (!selectedDay) return []
return getTimelist ({
        bookings: dayBookings,
        selectedDay,
       })
    },[dayBookings, selectedDay])

  return (
    <>
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
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBooingClick}
                >
                  Reservar
                </Button>
                <SheetContent>
                  <SheetHeader>Fazer Reserva</SheetHeader>
                  <div className="py-5 border-b border-solid">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      fromDate={new Date()}
                    />
                  </div>
                  {selectedDay && (
                    <div
                      className="flex overflow-x-auto p-5 gap-3 border-b border-solid
                [&::-webkit-scrollbar]:hidden "
                    >
                      {timelist.length > 0 ? timelist.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-full "
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      )) : <p className="text-sm">Não há horários disponiveis para este dia.</p> }
                    </div>
                  )}

                  {selectedDate && (
                  <div className="p-5">
                      
                  <BookingSummary barbershop={barbershop}
                    service={service}
                  selectedDate={selectedDate} />
                  
                    </div>
                 )}

                  <SheetFooter className="p-x5 mt-5">
                    <SheetClose asChild>
                      <Button
                        onClick={handleCreateBooking}
                        type="submit"
                        disabled={!selectedDay || !selectedTime}
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={SignInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <SignInDialog />
      </Dialog>
    </>
  );
};

export default ServiceItem;
