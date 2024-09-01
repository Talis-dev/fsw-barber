import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingItem from "./_components/booking-item";
import Search from "./_components/search";
import Link from "next/link";
import { authOptions } from "./_lib/auth";
import { getServerSession } from "next-auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const barbershops = await db.barbershop.findMany({}); // captura nome das barbearia no db
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  const confirmedbookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: { gte: new Date() },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : [];
  return (
    <div>
      {/*header */}
      <Header />
      {/*TEXTO*/}
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "Bem Vindo"}!{" "}
        </h2>
        <p>
          {" "}
          <span className="capitalize ">
            {format(new Date(), "EEEE, dd", { locale: ptBR })}
          </span>
          <span> de </span>
          <span className="capitalize ">
            {format(new Date(), "MMMM", { locale: ptBR })}
          </span>
        </p>

        {/*BUSCA*/}
        <Search />

        {/*BUSCA RAPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden ">
          {quickSearchOptions.map((option) => (
            <Button
              className=" gap-2 "
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt="cabelo"
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/*IMAGEM*/}
        <div className="relative h-[150px] w-full mt-6">
          <Image
            alt="Agende nos Melhores"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/*AGENDAMENTO*/}

        {confirmedbookings.length > 0 && (
        <h2 className="mt-6 mb-3 uppercase text-xs font-bold text-gray-400">
          Agendamentos
        </h2>
        )}

        <div className=" flex overflow-x-auto gap-2 [&::-webkit-scrollbar]:hidden ">
          {confirmedbookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <div>
          <h2 className="mt-6 mb-3 uppercase text-xs font-bold text-gray-400">
            Recomendados
          </h2>

          <div className=" flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden ">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>

          <h2
            className="mt-6 mb-3 uppercase text-xs font-bold text-gray-400
         "
          >
            Populares
          </h2>

          <div className=" flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden ">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
