import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  // Obtener todas las categorías
  async findAll(): Promise<Categories[]> {
    return this.categoriesRepository.find();
  }

  // Crear una nueva categoría
  async create(name: string): Promise<Categories> {
    const category = this.categoriesRepository.create({ name });
    return this.categoriesRepository.save(category);
  }
}