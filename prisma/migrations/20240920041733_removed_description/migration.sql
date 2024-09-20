/*
  Warnings:

  - A unique constraint covering the columns `[transactionDate,amount,totalAmount]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Transaction] DROP CONSTRAINT [Transaction_description_transactionDate_amount_totalAmount_key];

-- CreateIndex
ALTER TABLE [dbo].[Transaction] ADD CONSTRAINT [Transaction_transactionDate_amount_totalAmount_key] UNIQUE NONCLUSTERED ([transactionDate], [amount], [totalAmount]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
