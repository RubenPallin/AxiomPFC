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
  ) {}

  async getCartByUser(userId: number): Promise<Carts[]> {
    return this.cartsRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async addProductToCart(userId: number, productId: number, quantity: number): Promise<Carts> {
    // Busca si ya existe el producto en el carrito para este usuario
    const existingCartItem = await this.cartsRepository.findOne({
      where: { 
        user: { id: userId }, 
        product: { id: productId } 
      },
      relations: ['user', 'product']
    });
  
    if (existingCartItem) {
      // Si existe, incrementa la cantidad
      existingCartItem.quantity += quantity;
      return this.cartsRepository.save(existingCartItem); // Guarda el cambio en la base de datos
    }
  
    // Si no existe, crea una nueva entrada en el carrito
    const newCartItem = this.cartsRepository.create({
      user: { id: userId }, // Asegúrate de que `user` es una relación válida
      product: { id: productId }, // Asegúrate de que `product` es una relación válida
      quantity
    });
  
    return this.cartsRepository.save(newCartItem); // Guarda el nuevo elemento
  }

  async updateCartItem(cartId: number, quantity: number): Promise<Carts> {
    if (quantity < 1) {
      throw new Error('La cantidad debe ser un número mayor a 0');
    }
  
    const result = await this.cartsRepository.createQueryBuilder()
      .update(Carts)
      .set({ quantity }) // Asegúrate de que `quantity` está definido
      .where('id = :id', { id: cartId })
      .execute();
  
    if (result.affected === 0) {
      throw new NotFoundException('El producto no existe en el carrito');
    }
  
    // Devuelve el elemento actualizado con sus relaciones cargadas
    return this.cartsRepository.findOne({
      where: { id: cartId },
      relations: ['user', 'product'],
    });
  }

  async removeItemFromCart(cartId: number): Promise<void> {
    const result = await this.cartsRepository.delete(cartId);

    if (result.affected === 0) {
      throw new NotFoundException('El producto no existe en el carrito');
    }
  }
}