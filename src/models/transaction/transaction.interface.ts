export interface Transaction {
    id: string;
    transactionAmount: number;
    description: string;
    transactionDate: Date;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
}
