// src/types/global.d.ts
import { PrismaClient } from "@prisma/client";

// Augmenting the NodeJS global namespace
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}

// Ensure the file is treated as a module
export {};
