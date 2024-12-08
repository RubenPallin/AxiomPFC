import { Injectable, NotFoundException } from '@nestjs/common';
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
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  // Obtener productos del carrito por usuario
  async getCartByUser(userId: number) {
    return this.cartsRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
      select: {
        id: true,
        quantity: true,
        product: {
          id: true,
          name: true,
          price: true,
          image_url: true,
        },
      },
    });
  }

  // Agregar un producto al carrito
  async addProductToCart(userId: number, productId: number, quantity: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const product = await this.productsRepository.findOne({ where: { id: productId } });

    if (!user || !product) {
      throw new NotFoundException('Usuario o producto no encontrado');
    }

    const cart = this.cartsRepository.create({
      user,
      product,
      quantity
    });

    return this.cartsRepository.save(cart);
  }

  // Actualizar la cantidad de un producto en el carrito
  async updateCartItem(cartId: number, quantity: number) {
    const cartItem = await this.cartsRepository.findOne({ where: { id: cartId } });

    if (!cartItem) {
      throw new Error('El producto no existe en el carrito');
    }

    cartItem.quantity = quantity;
    return this.cartsRepository.save(cartItem);
  }

  // Eliminar un producto del carrito
  async removeItemFromCart(cartId: number) {
    const cartItem = await this.cartsRepository.findOne({ where: { id: cartId } });

    if (!cartItem) {
      throw new Error('El producto no existe en el carrito');
    }

    return this.cartsRepository.remove(cartItem);
  }
}