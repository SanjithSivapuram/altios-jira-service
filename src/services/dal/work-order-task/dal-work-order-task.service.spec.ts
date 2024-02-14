import { Test, TestingModule } from '@nestjs/testing';
import { DalWorkOrderTaskService } from './dal-work-order-task.service';

describe('DalWorkOrderTaskService', () => {
  let service: DalWorkOrderTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DalWorkOrderTaskService],
    }).compile();

    service = module.get<DalWorkOrderTaskService>(DalWorkOrderTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
