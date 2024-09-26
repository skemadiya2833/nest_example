import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findByUserNameAndPassword(username: string, password: string): Promise<User> {
    return await this.userRepository.findOneBy({ username, password });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
