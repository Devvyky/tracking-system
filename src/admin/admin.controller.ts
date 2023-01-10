import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/signup')
  async signUp(
    @Req() req: Request,
    @Res() res: Response,
    @Body()
    payload: {
      email: string;
      password: string;
    },
  ): Promise<any> {
    try {
      const data = await this.adminService.signup(payload);
      res.status(201).json({
        status: 'success',
        message: 'Admin Signup Successful!',
        data,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        status: 'fail',
        message: error.message || 'Something went wrong',
      });
    }
  }
}
