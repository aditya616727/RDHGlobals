import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

// On Vercel serverless environment, use writable /tmp directory for SQLite database
if (process.env.VERCEL) {
  const tmpDbPath = '/tmp/dev.db';
  if (!fs.existsSync(tmpDbPath)) {
    const seedDbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    if (fs.existsSync(seedDbPath)) {
      try {
        fs.copyFileSync(seedDbPath, tmpDbPath);
      } catch (e) {
        console.error('Failed to copy seed db to /tmp:', e);
      }
    }
  }
  process.env.DATABASE_URL = 'file:/tmp/dev.db';
} else if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./dev.db';
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
