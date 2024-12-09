import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get(':userId')
  async getCartItems(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartsService.getCartByUser(userId);
  }

  @Post()
  async addToCart(@Body() body: { userId: number; productId: number; quantity: number }) {
    console.log('Received body:', body);
    const { userId, productId, quantity } = body;
    return this.cartsService.addProductToCart(userId, productId, quantity);
  }

  @Patch(':cartId')
  async updateCartItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ) {
    if (quantity < 1) {
      throw new Error('La cantidad debe ser un número mayor a 0');
    }

    return this.cartsService.updateCartItem(cartId, quantity);
  }

  @Delete(':cartId')
  async removeCartItem(@Param('cartId', ParseIntPipe) cartId: number) {
    await this.cartsService.removeItemFromCart(cartId);
    return { message: 'Item removed from cart successfully' };
  }
}