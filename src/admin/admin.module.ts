import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { hash } from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Admin.name,
        useFactory: () => {
          const schema = AdminSchema;

          // Pre Save Middleware to hashpassword
          schema.pre('save', async function (next) {
            // Only run this function if password was actually modified
            if (!this.isModified('password')) return next();

            this.password = await hash(this.password, 12);
            next();
          });

          return schema;
        },
      },
    ]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
