import { Module } from '@nestjs/common';
import { AuthTwitterService } from './auth-twitter.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthTwitterService],
  exports: [AuthTwitterService],
})
export class AuthTwitterModule {}
