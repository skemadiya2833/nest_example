import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Assignment } from './assignment.entity';
import { Status } from './status.enum';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
  ) { }

  async findAll(): Promise<Assignment[]> {
    return await this.assignmentRepository.find();
  }

  async findOne(id: number): Promise<Assignment> {
    return await this.assignmentRepository.findOneBy({ id });
  }

  async create(assignment: Assignment): Promise<Assignment> {
    return await this.assignmentRepository.save(assignment);
  }

  async update(id: number, updateAssignmentDto: Partial<Assignment>): Promise<UpdateResult> {
    const assignment = await this.assignmentRepository.findOneBy({ id });
    if (!assignment) {
      throw new NotFoundException('Record not found.');
    }
    if (assignment.status === Status.DONE) {
      throw new NotAcceptableException('Cannot Change an assignment that is marked done.');
    }
    return await this.assignmentRepository.update(id, updateAssignmentDto);
  }

  async remove(id: number): Promise<void> {
    await this.assignmentRepository.delete(id);
  }
}
