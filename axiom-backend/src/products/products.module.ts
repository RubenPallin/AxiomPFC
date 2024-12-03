// src/products/product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { Categories } from 'src/categories/categories.entity'; // Importar la entidad Categories

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
