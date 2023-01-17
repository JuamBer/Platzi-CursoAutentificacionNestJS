import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: Request) {
    const user: User = req.user as User;
    return this.authService.generateJWT(user);
  }
}
