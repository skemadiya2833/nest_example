import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AssignmentModule } from './assignment/assignment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Assignment } from './assignment/assignment.entity';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strataegy';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/exceptionfilter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ams',
      entities: [User, Assignment],
      synchronize: true,
    }),
    UserModule,
    AssignmentModule,
    AuthModule,
    PassportModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    AuthService, 
    JwtStrategy, 
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }],
})
export class AppModule { }