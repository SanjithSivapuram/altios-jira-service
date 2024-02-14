import { Test, TestingModule } from '@nestjs/testing';
import { DalWorkOrderService } from './dal-work-order.service';

describe('DalWorkOrderService', () => {
  let service: DalWorkOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DalWorkOrderService],
    }).compile();

    service = module.get<DalWorkOrderService>(DalWorkOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
