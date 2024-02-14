import { Test, TestingModule } from '@nestjs/testing';
import { DalResourceService } from './dal-resource.service';

describe('DalResourceService', () => {
  let service: DalResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DalResourceService],
    }).compile();

    service = module.get<DalResourceService>(DalResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
