 // lib/prisma.ts

import { PrismaClient } from '@prisma/client';

declare global {
  // 避免在开发环境中重复实例化 PrismaClient
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;

