import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePackageDTO } from './dtos/create-package.dto';
import { PackagesService } from './packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post('/')
  async createPackage(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPackageDTO: CreatePackageDTO,
  ) {
    try {
      const data = await this.packagesService.create(createPackageDTO);
      res.status(201).json({
        status: 'success',
        message: 'Create New Package Successful!',
        data,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }

  @Get('/')
  async fetchPackages(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPackageDTO: CreatePackageDTO,
  ) {
    try {
      const data = await this.packagesService.create(createPackageDTO);
      res.status(201).json({
        status: 'success',
        message: 'Create New Package Successful!',
        data,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }
}
