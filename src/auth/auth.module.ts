import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { SessionModule } from 'src/session/session.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthProcessor } from './auth.processor';

@Module({
  imports: [
    UsersModule,
    SessionModule,
    PassportModule,
    MailModule,
    JwtModule.register({}),
    BullModule.registerQueue({
      name: 'auth',
    }),
  ],
  controllers: [AuthController],
  providers: [
    IsExist,
    IsNotExist,
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    AnonymousStrategy,
    AuthProcessor,
  ],
  exports: [AuthService],
})
export class AuthModule {}
