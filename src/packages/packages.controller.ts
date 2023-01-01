import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePackageDTO, UpdatePackageDTO } from './dtos/index.dto';
import { PackagesService } from './packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post('/track')
  async trackPackage(
    @Req() req: Request,
    @Res() res: Response,
    @Body('trackingId') trackingId: string,
  ): Promise<void> {
    try {
      const data = await this.packagesService.track(trackingId);
      res.status(200).json({
        status: 'success',
        message: 'Retrived Package Record Success',
        data,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }

  @Post('/')
  async createPackage(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPackageDTO: CreatePackageDTO,
  ): Promise<void> {
    try {
      const data = await this.packagesService.create(createPackageDTO);
      res.status(201).json({
        status: 'success',
        message: 'Create New Package Successful!',
        data,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }

  @Get('/')
  async fetchPackages(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const data = await this.packagesService.fetch();
      res.status(200).json({
        status: 'success',
        message: 'Fetch All Packages Successful!',
        data,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }

  @Patch('/:id')
  async updatePackages(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updatePackageDTO: UpdatePackageDTO,
  ): Promise<void> {
    try {
      const data = await this.packagesService.update(id, updatePackageDTO);
      res.status(200).json({
        status: 'success',
        message: 'Update Package Successful!',
        data,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }

  @Delete('/:id')
  async deletePackage(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      await this.packagesService.delete(id);
      res.status(204).json({
        status: 'success',
        message: 'Delete Package Successful!',
      });
    } catch (error) {
      res.status(error.status || 500).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }
}
