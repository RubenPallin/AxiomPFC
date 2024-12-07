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
  ) {}

  // Obtener productos del carrito por usuario
  async getCartByUser(userId: number) {
    return this.cartsRepository.find({
      where: { user: { id: userId } },
      relations: ['product'], // Incluye la relación con productos
    });
  }

  // Agregar un producto al carrito
  async addProductToCart(userId: number, productId: number, quantity: number) {
    const existingCartItem = await this.cartsRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (existingCartItem) {
      // Si el producto ya está en el carrito, solo actualizamos la cantidad
      existingCartItem.quantity += quantity;
      return this.cartsRepository.save(existingCartItem);
    }

    // Crear un nuevo item en el carrito
    const newCartItem = this.cartsRepository.create({
      user: { id: userId },
      product: { id: productId },
      quantity,
    });

    return this.cartsRepository.save(newCartItem);
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