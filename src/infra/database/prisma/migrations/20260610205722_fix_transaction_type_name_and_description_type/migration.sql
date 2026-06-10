/*
  Warnings:

  - Changed the type of `type` on the `PlannedTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('IN', 'OUT');

-- DropIndex
DROP INDEX "PlannedTransaction_description_key";

-- AlterTable
ALTER TABLE "PlannedTransaction" DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL;

-- DropEnum
DROP TYPE "TransationType";
