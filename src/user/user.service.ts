import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto, SignInDto } from '../models/app.model';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async singIn(signInDto: SignInDto): Promise<User> {
    const user = new this.userModel(signInDto);
    return await user.save();
  }

  async loginIn(loginDto: LoginDto): Promise<User> {
    let user = await this.userModel.findOne({ username: loginDto.username });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user = await this.userModel.findOne({
      username: loginDto.username,
      password: loginDto.password,
    });

    if (!user) {
      throw new NotFoundException('Invalid credentials (password)');
    }

    return user;
  }
}
