BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Transaction] (
    [id] NVARCHAR(1000) NOT NULL,
    [amount] FLOAT(53) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [transactionDate] DATE NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Transaction_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Transaction_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TransactionType] (
    [id] NVARCHAR(1000) NOT NULL,
    [transactionTypeName] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [TransactionType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [transactionId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TransactionType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [TransactionType_transactionId_key] UNIQUE NONCLUSTERED ([transactionId])
);

-- AddForeignKey
ALTER TABLE [dbo].[TransactionType] ADD CONSTRAINT [TransactionType_transactionId_fkey] FOREIGN KEY ([transactionId]) REFERENCES [dbo].[Transaction]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
