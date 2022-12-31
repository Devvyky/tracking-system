import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePackageDTO } from './dtos/create-package.dto';
import { Package } from './entities/packages.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(Package.name)
    private readonly packageModel: Model<Package>,
  ) {}

  async create(payload: CreatePackageDTO): Promise<Package> {
    return this.packageModel.create(payload);
  }
}
