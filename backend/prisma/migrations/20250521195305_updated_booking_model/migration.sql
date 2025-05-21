/*
  Warnings:

  - You are about to drop the column `cabinClass` on the `Bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "cabinClass",
ADD COLUMN     "airline" TEXT,
ADD COLUMN     "stopCount" TEXT,
ALTER COLUMN "price" SET DATA TYPE TEXT;
