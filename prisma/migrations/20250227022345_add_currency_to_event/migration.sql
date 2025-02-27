-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('CAD', 'USD', 'EUR', 'GBP');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'CAD';
