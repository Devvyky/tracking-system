import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePackageDTO, UpdatePackageDTO } from './dtos/index.dto';
import { Package } from './entities/packages.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(Package.name)
    private readonly packageModel: Model<Package>,
  ) {}

  async track(trackingId: string): Promise<Package> {
    const doc = await this.packageModel.findOne({
      trackingId,
      isDeleted: false,
    });
    if (!doc) {
      throw new NotFoundException('No Package with that tracking id was found');
    }
    return doc;
  }

  async fetch(): Promise<Package[]> {
    return this.packageModel.find({ isDeleted: false });
  }

  async create(payload: CreatePackageDTO): Promise<Package> {
    return this.packageModel.create(payload);
  }

  async update(id: string, payload: UpdatePackageDTO): Promise<Package> {
    const item = await this.packageModel.findById(id);

    if (!item) {
      throw new NotFoundException('No Package Found');
    }

    const updated = this.packageModel.findOneAndUpdate(
      {
        id,
      },
      {
        ...payload,
      },
      {
        new: true,
      },
    );

    return updated;
  }

  async delete(id: string): Promise<void> {
    const doc = await this.packageModel.findOne({ id, isDeleted: false });

    if (!doc) {
      throw new NotFoundException('No document found with that id');
    }

    doc.isDeleted = true;
    await doc.save();
  }
}
