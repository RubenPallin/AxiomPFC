import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // Obtener el carrito de un usuario
  @Get(':userId')
  async getUserCart(@Param('userId') userId: number) {
    return this.cartsService.getUserCart(userId);
  }

  // Añadir un producto al carrito
  @Post('add')
  async addToCart(@Body() body: { userId: number, productId: number, quantity: number }) {
    return this.cartsService.addToCart(body.userId, body.productId, body.quantity);
  }

  // Eliminar un producto del carrito
  @Delete('remove')
  async removeFromCart(@Body() body: { userId: number, productId: number }) {
    return this.cartsService.removeFromCart(body.userId, body.productId);
  }
}