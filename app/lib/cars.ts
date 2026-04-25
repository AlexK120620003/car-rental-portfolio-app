import prisma from "./prisma";
import type { Category } from "./types";

export async function getCars(category?: Category) {
  try {
    return await prisma.car.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export async function getCarById(id: string) {
  try {
    return await prisma.car.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function getCarsByCategory(category: Category) {
  try {
    return await prisma.car.findMany({ where: { category } });
  } catch {
    return [];
  }
}
