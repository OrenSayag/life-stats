import { Test, TestingModule } from '@nestjs/testing';
import { MoneyTransactionController } from './money-transaction.controller';

describe('MoneyTransactionController', () => {
  let controller: MoneyTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyTransactionController],
    }).compile();

    controller = module.get<MoneyTransactionController>(MoneyTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
