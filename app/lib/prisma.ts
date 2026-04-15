import { PrismaClient } from "../generated/prisma/client";
import {PrismaPg} from '@prisma/adapter-pg'

const connectionString = process.env.POSTGRES_PRISMA_URL!;
const adapter = new PrismaPg({ connectionString })

// Create a function that makes a new PrismaClient
function makePrismaClient() {
  return new PrismaClient({ adapter });
}

// Check if we already have a client saved globally
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
}

// Use existing client OR create new one
const prisma = globalForPrisma.prisma ?? makePrismaClient()

// In development, save to global so hot reload reuses it
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma