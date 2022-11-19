import { PrismaClient } from '@prisma/client';

export const createConnection = () => new PrismaClient();
