/*
  Warnings:

  - A unique constraint covering the columns `[description,transactionDate,amount]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Transaction] DROP CONSTRAINT [Transaction_description_transactionDate_key];

-- CreateIndex
ALTER TABLE [dbo].[Transaction] ADD CONSTRAINT [Transaction_description_transactionDate_amount_key] UNIQUE NONCLUSTERED ([description], [transactionDate], [amount]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
