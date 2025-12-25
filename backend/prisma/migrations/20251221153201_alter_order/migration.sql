/*
  Warnings:

  - You are about to drop the column `redirectUrl` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "redirectUrl",
ADD COLUMN     "midtransToken" TEXT DEFAULT '';
