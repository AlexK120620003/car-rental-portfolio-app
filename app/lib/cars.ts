import prisma from "./prisma";

export async function getCars() {
    return await prisma.car.findMany()
}

export async function getCarById(id: string) {
  return await prisma.car.findUnique({ where: {id}})
}

export async function getCarsByCategory(category: string) {
  return await prisma.car.findMany( {where: {category: category as any}})
}