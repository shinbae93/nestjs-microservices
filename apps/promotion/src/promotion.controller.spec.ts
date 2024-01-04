import { Test, TestingModule } from '@nestjs/testing';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';

describe('PromotionController', () => {
  let promotionController: PromotionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PromotionController],
      providers: [PromotionService],
    }).compile();

    promotionController = app.get<PromotionController>(PromotionController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(promotionController.getHello()).toBe('Hello World!');
    });
  });
});
