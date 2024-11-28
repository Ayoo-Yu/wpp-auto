// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// 扩展 NodeJS.Global 接口
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// 扩展 globalThis 类型
type GlobalThisWithPrisma = typeof globalThis & {
  prisma: PrismaClient | undefined;
};

const globalWithPrisma = global as GlobalThisWithPrisma;

const prisma = globalWithPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalWithPrisma.prisma = prisma;
}

export default prisma;