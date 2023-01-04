import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { omit } from 'lodash';
import { Model } from 'mongoose';

import { CreatePackageDTO, UpdatePackageDTO } from './dtos/index.dto';
import { HistoryStatus, Package } from './entities/packages.entity';

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
    const doc = await this.packageModel.findById(id);

    if (!doc) {
      throw new NotFoundException('No Package Found');
    }

    const { history } = doc;

    const isPickedUpOrDelivered = history.some(
      (el) =>
        el.status === HistoryStatus.PICKED_UP ||
        el.status === HistoryStatus.DELIVERED,
    );

    if (isPickedUpOrDelivered) {
      throw new ForbiddenException(
        'Package has already been picked up or delivered',
      );
    }

    const criteria: any = {
      ...payload,
    };

    if (!isPickedUpOrDelivered && payload.history) {
      const history = {
        status: payload.history.status,
        description: payload.history.description,
      };
      criteria.$addToSet = { history };
    }

    const updated = this.packageModel.findOneAndUpdate(
      {
        id,
      },
      {
        ...omit(criteria, ['history']),
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
