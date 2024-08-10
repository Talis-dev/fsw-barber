import { PrismaClient } from "@prisma/client";
// esse codigo faz com que o prisma conecta somente uma vez
// ao banco de dados, evita multiplas conecxoes ao recopilar o codigo
declare global {
    var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production'){
    prisma = new  PrismaClient()
} else {
    if (!global.cachedPrisma){
        global.cachedPrisma = new PrismaClient
    }
    prisma = global.cachedPrisma
}

export const db = prisma