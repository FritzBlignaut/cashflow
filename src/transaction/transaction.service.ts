import { Injectable } from '@nestjs/common';
import { Transaction, PrismaClient } from '@prisma/client';

@Injectable()
export class TransactionService {
    private prisma = new PrismaClient();

    async findAll(): Promise<Transaction[]> {
        return await this.prisma.transaction.findMany();
    }
}
