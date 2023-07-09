import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const globalPrisma: PrismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

export type globalPrisma = PrismaClient;
