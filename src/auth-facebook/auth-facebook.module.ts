import { Module } from '@nestjs/common';
import { AuthFacebookService } from './auth-facebook.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthFacebookService],
  exports: [AuthFacebookService],
})
export class AuthFacebookModule {}
