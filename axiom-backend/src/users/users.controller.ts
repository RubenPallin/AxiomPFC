import { Controller, Post, Get, Body, HttpCode, HttpStatus, BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

class RegisterUserBody {
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name: string;

  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString()
  @Matches(/^\d{9,}$/, { message: 'El teléfono debe tener al menos 9 dígitos' })
  phone: string;
}

class LoginUserBody {
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;

  @IsString()
  password: string;
}

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: RegisterUserBody): Promise<Users> {
    const { email, password, name, phone } = body;

    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    // Crear y guardar el nuevo usuario
    try {
      return await this.usersService.create(email, password, name, phone);
    } catch (error) {
      throw new BadRequestException('No se pudo crear el usuario');
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginUserBody) {
    const { email, password } = body;
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await this.usersService.validatePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = await this.usersService.generateJwt(user);
    return { access_token: token };
  }

  @Get('users')
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

}