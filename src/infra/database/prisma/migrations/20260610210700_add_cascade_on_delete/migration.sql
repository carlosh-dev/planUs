-- DropForeignKey
ALTER TABLE "PlannedTransactionTag" DROP CONSTRAINT "PlannedTransactionTag_plannedTransactionId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionTag" DROP CONSTRAINT "TransactionTag_transactionId_fkey";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionTag" ADD CONSTRAINT "TransactionTag_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedTransactionTag" ADD CONSTRAINT "PlannedTransactionTag_plannedTransactionId_fkey" FOREIGN KEY ("plannedTransactionId") REFERENCES "PlannedTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
