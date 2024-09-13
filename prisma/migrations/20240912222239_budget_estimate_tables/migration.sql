BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[TransactionCategory] ADD [budgetId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[Budget] (
    [id] NVARCHAR(1000) NOT NULL,
    [budgetName] NVARCHAR(1000) NOT NULL,
    [budgetStartDate] DATETIME2 NOT NULL,
    [budgetEndDate] DATETIME2 NOT NULL,
    [budgetActive] BIT NOT NULL CONSTRAINT [Budget_budgetActive_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Budget_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Budget_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BudgetEstimate] (
    [id] NVARCHAR(1000) NOT NULL,
    [budgetAmount] FLOAT(53) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [BudgetEstimate_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [budgetId] NVARCHAR(1000) NOT NULL,
    [transactionCategoryId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [BudgetEstimate_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[BudgetEstimate] ADD CONSTRAINT [BudgetEstimate_budgetId_fkey] FOREIGN KEY ([budgetId]) REFERENCES [dbo].[Budget]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BudgetEstimate] ADD CONSTRAINT [BudgetEstimate_transactionCategoryId_fkey] FOREIGN KEY ([transactionCategoryId]) REFERENCES [dbo].[TransactionCategory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
