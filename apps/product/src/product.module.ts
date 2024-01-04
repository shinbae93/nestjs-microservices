import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
