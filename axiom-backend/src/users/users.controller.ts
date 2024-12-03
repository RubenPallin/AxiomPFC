import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Crear un nuevo usuario (registro)
  @Post('register')
  async register(@Body() body: { email: string; password: string; name: string }) {
    const { email, password, name } = body;
    const user = await this.usersService.create(email, password, name);
    return { message: 'User created successfully', user };
  }

  // Login de un usuario (autenticación)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return { message: 'User not found' };
    }

    const isPasswordValid = await this.usersService.validatePassword(password, user.password);

    if (!isPasswordValid) {
      return { message: 'Invalid credentials' };
    }

    const token = await this.usersService.generateJwt(user);
    return { access_token: token };
  }
}
