/*
  Warnings:

  - You are about to drop the column `transactionId` on the `TransactionType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionTypeId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionTypeId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[TransactionType] DROP CONSTRAINT [TransactionType_transactionId_fkey];

-- DropIndex
ALTER TABLE [dbo].[TransactionType] DROP CONSTRAINT [TransactionType_transactionId_key];

-- AlterTable
ALTER TABLE [dbo].[Transaction] ADD [transactionTypeId] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[TransactionType] DROP COLUMN [transactionId];

-- CreateIndex
ALTER TABLE [dbo].[Transaction] ADD CONSTRAINT [Transaction_transactionTypeId_key] UNIQUE NONCLUSTERED ([transactionTypeId]);

-- AddForeignKey
ALTER TABLE [dbo].[Transaction] ADD CONSTRAINT [Transaction_transactionTypeId_fkey] FOREIGN KEY ([transactionTypeId]) REFERENCES [dbo].[TransactionType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
