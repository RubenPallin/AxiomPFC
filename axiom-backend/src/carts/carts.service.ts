import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carts } from './carts.entity';
import { Users } from 'src/users/users.entity';
import { Products } from 'src/products/products.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Carts)
    private cartsRepository: Repository<Carts>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  // Obtener el carrito de un usuario
  async getUserCart(userId: number): Promise<Carts[]> {
    return this.cartsRepository.find({
      where: { user: { id: userId } }, // Aquí se pasa el objeto correctamente
      relations: ['product'],
    });
  }

  // Añadir un producto al carrito
  async addToCart(userId: number, productId: number, quantity: number): Promise<Carts> {
    const user = await this.usersRepository.findOne({
      where: { id: userId }, 
    });
    const product = await this.productsRepository.findOne({
      where: { id: productId }, 
    });

    if (!user || !product) {
      throw new Error('User or product not found');
    }

    const cartItem = this.cartsRepository.create({ user, product, quantity });
    return this.cartsRepository.save(cartItem);
  }

  // Eliminar un producto del carrito
  async removeFromCart(userId: number, productId: number): Promise<void> {
    const cartItem = await this.cartsRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: productId }, 
      },
    });

    if (cartItem) {
      await this.cartsRepository.remove(cartItem);
    }
  }
}
