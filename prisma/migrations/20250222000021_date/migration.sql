/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `details` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TEXT;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "details" TEXT NOT NULL;
