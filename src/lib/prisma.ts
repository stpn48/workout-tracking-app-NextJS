import { PrismaClient } from "@prisma/client";

declare global {
  // Ensure this is only available in development, to avoid issues in production.
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
