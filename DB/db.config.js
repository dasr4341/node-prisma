import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient({
    log: ["query"] // will print all the query
})

export default prisma;