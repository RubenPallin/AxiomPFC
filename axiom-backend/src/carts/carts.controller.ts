import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // Obtener todos los productos del carrito
  @Get(':userId')
  async getCartItems(@Param('userId') userId: number) {
    return this.cartsService.getCartByUser(userId);
  }

  // Agregar un producto al carrito
  @Post()
  async addToCart(@Body() body: any) {
    const { userId, productId, quantity } = body;

    // Validación manual de los datos
    if (!userId || !productId || !quantity) {
      throw new Error('Todos los campos (userId, productId, quantity) son obligatorios');
    }

    return this.cartsService.addProductToCart(userId, productId, quantity);
  }

  // Actualizar la cantidad de un producto en el carrito
  @Patch(':cartId')
  async updateCartItem(
    @Param('cartId') cartId: number,
    @Body() body: any,
  ) {
    const { quantity } = body;

    if (!quantity || quantity < 1) {
      throw new Error('La cantidad debe ser un número mayor a 0');
    }

    return this.cartsService.updateCartItem(cartId, quantity);
  }

  // Eliminar un producto del carrito
  @Delete(':cartId')
  async removeCartItem(@Param('cartId') cartId: number) {
    return this.cartsService.removeItemFromCart(cartId);
  }
}