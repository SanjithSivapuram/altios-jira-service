import { Test, TestingModule } from '@nestjs/testing';
import { DalCategoryService } from './dal-category.service';

describe('DalCategoryService', () => {
  let service: DalCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DalCategoryService],
    }).compile();

    service = module.get<DalCategoryService>(DalCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
