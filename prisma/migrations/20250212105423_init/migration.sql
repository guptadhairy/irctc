/*
  Warnings:

  - Added the required column `seattype` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seattype` to the `Train` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "seattype" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Train" ADD COLUMN     "seattype" TEXT NOT NULL;
