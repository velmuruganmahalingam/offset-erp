import { Test, TestingModule } from '@nestjs/testing';
import { SetmakeController } from './setmake.controller';

describe('SetmakeController', () => {
  let controller: SetmakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetmakeController],
    }).compile();

    controller = module.get<SetmakeController>(SetmakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
