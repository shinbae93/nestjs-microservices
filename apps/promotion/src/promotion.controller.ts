import { Controller, Get } from '@nestjs/common';
import { PromotionService } from './promotion.service';

@Controller()
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  getHello(): string {
    return this.promotionService.getHello();
  }
}
