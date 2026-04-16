// Re-export Prisma types from one place.
// If Prisma changes its structure, we only update this file.

export type { User, Car, Booking, Contact } from "../generated/prisma/client";
export { Role, Category, BookingStatus } from "../generated/prisma/enums";
