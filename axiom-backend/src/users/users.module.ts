import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { JwtModule } from '@nestjs/jwt';  // Importa JwtModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),  // Importa la entidad Users
    JwtModule.register({  // Registra el JwtModule y configura las opciones
      secret: 'secretKey',  // Aquí puedes definir tu clave secreta
      signOptions: { expiresIn: '1h' },  // Configura las opciones de expiración del token
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}