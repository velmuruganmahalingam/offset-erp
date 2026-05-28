import { Test, TestingModule } from '@nestjs/testing';
import { SetmakeService } from './setmake.service';

describe('SetmakeService', () => {
  let service: SetmakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetmakeService],
    }).compile();

    service = module.get<SetmakeService>(SetmakeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
