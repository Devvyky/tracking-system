import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dtos/index.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Req() req: Request,
    @Res() res: Response,
    @Body()
    payload: SignUpDTO,
  ): Promise<any> {
    try {
      const data = await this.authService.signup(payload);
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
