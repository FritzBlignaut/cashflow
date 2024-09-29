BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[TransactionBudgetEstimate] (
    [id] NVARCHAR(1000) NOT NULL,
    [transactionId] NVARCHAR(1000) NOT NULL,
    [budgetEstimateId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [TransactionBudgetEstimate_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [TransactionBudgetEstimate_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[TransactionBudgetEstimate] ADD CONSTRAINT [TransactionBudgetEstimate_transactionId_fkey] FOREIGN KEY ([transactionId]) REFERENCES [dbo].[Transaction]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TransactionBudgetEstimate] ADD CONSTRAINT [TransactionBudgetEstimate_budgetEstimateId_fkey] FOREIGN KEY ([budgetEstimateId]) REFERENCES [dbo].[BudgetEstimate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
