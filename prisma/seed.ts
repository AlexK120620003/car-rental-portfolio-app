import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.POSTGRES_PRISMA_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
 // then we created a value prisma and we said this is new PrismaClient

async function main() { // then we wrote a async function for inserting data
  await prisma.booking.deleteMany()
  await prisma.car.deleteMany()
  await prisma.user.deleteMany()
  await prisma.contact.deleteMany()
  console.log("Database cleaned")

  const admin = await prisma.user.create({
    data: {
      email: "admin@rentola.com",
      password: "admin123",
      name: "Admin",
      role: "ADMIN",
    }
  })

  const user = await prisma.user.create({
    data: {
      email: "user@test.com",
      password: "user123",
      name: "John Doe",
      role: "USER",
    }
  })

  const cars = await prisma.car.createMany({
  data: [
    {
      brand: "BMW",
      model: "5 Series",
      year: 2024,
      category: "SEDAN",
      pricePerDay: 89,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      description: "Luxury sedan with premium comfort and powerful engine",
      available: true,
    },
    {
      brand: "Tesla",
      model: "Model 3",
      year: 2024,
      category: "ELECTRIC",
      pricePerDay: 79,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
      description: "All-electric sedan with autopilot and long range battery",
      available: true,
    },

    // 👇 новые 6 машин

    {
      brand: "Audi",
      model: "Q7",
      year: 2023,
      category: "SUV",
      pricePerDay: 95,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
      description: "Spacious SUV with quattro all-wheel drive",
      available: true,
    },
    {
      brand: "Mercedes-Benz",
      model: "S-Class",
      year: 2024,
      category: "LUXURY",
      pricePerDay: 150,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      description: "Top-tier luxury sedan with advanced technology",
      available: true,
    },
    {
      brand: "Porsche",
      model: "911 Carrera",
      year: 2023,
      category: "SPORTS",
      pricePerDay: 180,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
      description: "Iconic sports car with exceptional performance",
      available: true,
    },
    {
      brand: "Toyota",
      model: "Camry",
      year: 2022,
      category: "SEDAN",
      pricePerDay: 60,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
      description: "Reliable and fuel-efficient daily sedan",
      available: true,
    },
    {
      brand: "Ford",
      model: "Mustang",
      year: 2023,
      category: "SPORTS",
      pricePerDay: 120,
      image: "https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?w=800",
      description: "Classic American muscle car with мощный двигатель",
      available: true,
    },
    {
      brand: "Hyundai",
      model: "Ioniq 5",
      year: 2024,
      category: "ELECTRIC",
      pricePerDay: 85,
      image: "https://images.unsplash.com/photo-1649921875610-6f0d2e0e6f2b?w=800",
      description: "Modern electric crossover with fast charging",
      available: true,
    },
  ],
});

  console.log(`Created ${cars.count} cars`);
  console.log("Users created", {admin: admin.email, user: user.email})
}

main() // then we used main func. for catching error whith event or if we don't we wait whet the prisma will disconnect 
  .catch((e) => {
    console.error(e)
  }
)
.finally(async () => {
  await prisma.$disconnect()
})