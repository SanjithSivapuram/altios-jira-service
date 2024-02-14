import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderTaskService } from './work-order-task.service';

describe('WorkOrderTaskService', () => {
  let service: WorkOrderTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkOrderTaskService],
    }).compile();

    service = module.get<WorkOrderTaskService>(WorkOrderTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
