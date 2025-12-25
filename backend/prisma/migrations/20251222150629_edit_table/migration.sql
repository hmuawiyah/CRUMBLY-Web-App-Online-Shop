/*
  Warnings:

  - You are about to drop the column `address` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "address",
ADD COLUMN     "userAddressesId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userAddressesId_fkey" FOREIGN KEY ("userAddressesId") REFERENCES "UserAddresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
