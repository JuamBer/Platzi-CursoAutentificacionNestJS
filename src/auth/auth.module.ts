import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport/dist';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import config from './../config';
import { ConfigType } from '@nestjs/config';
import { JWTStrategy } from './strategies/jwt.estrategy';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: { expiresIn: configService.jwtExpiration },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JWTStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
