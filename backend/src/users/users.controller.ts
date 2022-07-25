import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { IUser } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(@Body() body: IUser) {
    const generatedId = await this.usersService.insertUser(body);
    return { id: generatedId };
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body('userName') userName: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.login(userName, password);
    return { isAdmin: user.isAdmin, fullName: user.fullName, id: user.id };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') userId: string,
    @Body('fullName') fullName: string,
  ) {
    await this.usersService.updateUser(userId, fullName);
    return null;
  }
}
