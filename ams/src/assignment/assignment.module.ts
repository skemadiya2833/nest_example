import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './assignment.entity';
import { Module } from '@nestjs/common';

@Module({
  imports:[ TypeOrmModule.forFeature([Assignment])],
  controllers: [AssignmentController],
  providers: [AssignmentService]
})
export class AssignmentModule {}
