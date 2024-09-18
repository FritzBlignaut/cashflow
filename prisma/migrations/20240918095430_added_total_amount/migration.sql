/*
  Warnings:

  - A unique constraint covering the columns `[description,transactionDate,amount,totalAmount]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totalAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Transaction] DROP CONSTRAINT [Transaction_description_transactionDate_amount_key];

-- AlterTable
ALTER TABLE [dbo].[Transaction] ADD [totalAmount] FLOAT(53) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Transaction] ADD CONSTRAINT [Transaction_description_transactionDate_amount_totalAmount_key] UNIQUE NONCLUSTERED ([description], [transactionDate], [amount], [totalAmount]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
