import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])], // Importa la entidad Category
  providers: [CategoriesService], // Agrega el servicio de categorías
  controllers: [CategoriesController], // Agrega el controlador de categorías
})
export class CategoriesModule {}
