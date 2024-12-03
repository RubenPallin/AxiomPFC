import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { Carts } from './carts.entity';  // Asegúrate de importar la entidad Carts
import { UsersModule } from '../users/users.module';  // Importa el UsersModule
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carts]),  // Añade la entidad Carts aquí
    UsersModule,  // Importa UsersModule
    ProductsModule,  // Si es necesario importar ProductsModule también
  ],
  providers: [CartsService],
  controllers: [CartsController],
})
export class CartsModule {}