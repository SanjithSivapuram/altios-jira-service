import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderTaskController } from './work-order-task.controller';
import { WorkOrderTaskService } from './work-order-task.service';

describe('WorkOrderTaskController', () => {
  let controller: WorkOrderTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkOrderTaskController],
      providers: [WorkOrderTaskService],
    }).compile();

    controller = module.get<WorkOrderTaskController>(WorkOrderTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
