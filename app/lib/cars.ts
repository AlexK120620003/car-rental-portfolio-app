import prisma from "./prisma";
import type { Category } from "./types";

export async function getCars(category?: Category) {
  return await prisma.car.findMany({
    where: category ? {category} :undefined,
    orderBy: {createdAt: 'desc'}
  });
}

export async function getCarById(id: string) {
  return await prisma.car.findUnique({ where: { id } });
}

export async function getCarsByCategory(category: Category) {
  return await prisma.car.findMany({ where: { category } });
}
