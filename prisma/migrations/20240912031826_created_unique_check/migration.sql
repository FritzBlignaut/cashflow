/*
  Warnings:

  - A unique constraint covering the columns `[description,transactionDate]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Transaction] ADD CONSTRAINT [Transaction_description_transactionDate_key] UNIQUE NONCLUSTERED ([description], [transactionDate]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
