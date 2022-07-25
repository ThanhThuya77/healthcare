import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async login(userName: string, password: string): Promise<IUser> {
    let user;

    try {
      user = await this.userModel.findOne({ userName, password });
    } catch (error) {
      throw new NotFoundException('The username or password is incorrect');
    }

    if (!user) {
      throw new NotFoundException('The username or password is incorrect');
    }
    return user;
  }

  async insertUser(body: IUser) {
    const newUser = new this.userModel(body);
    const result = await newUser.save();
    return result.id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      isAdmin: user.isAdmin,
    })) as IUser[];
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return { id: user.id, fullName: user.fullName, isAdmin: user.isAdmin };
  }

  async updateUser(userId: string, fullName: string) {
    const updatedUser = await this.findUser(userId);

    if (fullName) {
      updatedUser.fullName = fullName;
    }

    await updatedUser.save();
  }

  private async findUser(userId: string): Promise<IUser> {
    let user;
    try {
      user = await this.userModel.findById(userId);
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }

    if (!user) {
      throw new NotFoundException('Could not find user.');
    }

    return user;
  }
}
