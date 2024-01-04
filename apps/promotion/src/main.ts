import { NestFactory } from '@nestjs/core';
import { PromotionModule } from './promotion.module';

async function bootstrap() {
  const app = await NestFactory.create(PromotionModule);
  await app.listen(3000);
}
bootstrap();
