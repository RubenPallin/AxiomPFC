import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Endpoint para obtener todos los productos
  @Get()
  async getAllProducts(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  // Endpoint para obtener productos aleatorios (5 productos)
  @Get('destacados')
  async getRandomProducts(): Promise<Products[]> {
    return this.productsService.findRandom();  // Llamar al método del servicio
  }

  @Get('category/:categoryId')
  async getProductsByCategory(@Param('categoryId') categoryId: number): Promise<Products[]> {
    return this.productsService.findByCategory(categoryId);
  }

  @Get('featured')
  async getFeaturedProducts(): Promise<Products[]> {
    return this.productsService.findFeatured();
  }

}