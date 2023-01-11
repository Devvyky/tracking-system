import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/admin/entities/admin.entity';
import { SignUpDTO } from './dtos/index.dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<Admin>,
  ) {}

  async signup(payload: SignUpDTO): Promise<Admin> {
    return this.adminModel.create({
      ...payload,
    });
  }
}
