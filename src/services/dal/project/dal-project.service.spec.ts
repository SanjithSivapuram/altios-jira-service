import { Test, TestingModule } from '@nestjs/testing';
import { DalProjectService } from './dal-project.service';

describe('DalProjectService', () => {
  let service: DalProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DalProjectService],
    }).compile();

    service = module.get<DalProjectService>(DalProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
