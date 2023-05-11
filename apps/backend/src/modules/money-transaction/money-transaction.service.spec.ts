import { Test, TestingModule } from '@nestjs/testing';
import { MoneyTransactionService } from './money-transaction.service';

describe('MoneyTransactionService', () => {
  let service: MoneyTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyTransactionService],
    }).compile();

    service = module.get<MoneyTransactionService>(MoneyTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
