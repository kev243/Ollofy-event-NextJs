/*
  Warnings:

  - Added the required column `url` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "image" TEXT,
ADD COLUMN     "moreInfo" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;
