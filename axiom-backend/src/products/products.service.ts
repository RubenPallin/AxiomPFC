import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { Categories } from '../categories/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  // Obtener todos los productos
  async findAll(): Promise<Products[]> {
    return this.productsRepository.find({ relations: ['category'] });
  }

  // Obtener productos destacados (puedes usar un flag o filtrar algunos productos manualmente)
  async findFeatured(): Promise<Products[]> {
    return this.productsRepository.find({
      take: 4, // Solo los primeros 4 productos destacados
      relations: ['category'],
      order: { created_at: 'DESC' }, // Ordenar por fecha de creación
    });
  }

  // Método para obtener 5 productos aleatorios
  async findRandom(): Promise<Products[]> {
    const allProducts = await this.productsRepository.find(); // Obtén todos los productos
    // Escoge 5 productos aleatorios
    const randomProducts = this.getRandomItems(allProducts, 5);
    return randomProducts;
  }

  // Función auxiliar para obtener elementos aleatorios
  private getRandomItems(arr: any[], num: number): any[] {
    const shuffled = arr.sort(() => 0.5 - Math.random()); // Mezcla aleatoriamente los productos
    return shuffled.slice(0, num); // Devuelve solo los primeros 'num' productos
  }
  async findByCategory(categoryId: number): Promise<Products[]> {
    if (categoryId === null) {
      return this.findAll();
    }
    return this.productsRepository.find({
      where: {
        category: { id: categoryId }
      },
      relations: ['category']
    });
  }

  async findOne(id: number): Promise<Products> {
    return this.productsRepository.findOne({ where: { id } });
  }
  
}
