import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Obtener todas las categorías
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  // Crear una nueva categoría
  @Post()
  async create(@Body() body: { name: string }) {
    return this.categoriesService.create(body.name);
  }
}