import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HistoryStatus,
  Package,
  PackageSchema,
} from './entities/packages.entity';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Package.name,
        useFactory: () => {
          const schema = PackageSchema;
          schema.pre('save', function (next) {
            if (this.isNew) {
              const abbrev = 'TS';

              const val = Math.floor(100000000 + Math.random() * 900000000);
              this.trackingId = `${abbrev}-${val}`;
              this.history = [
                {
                  status: HistoryStatus.WAREHOUSE,
                  description:
                    'Your package is in our custody at our warehouse',
                  createdAt: new Date(),
                },
              ];
            }

            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
