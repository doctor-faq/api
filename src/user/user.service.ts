import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CrudService } from 'src/lib/crud.service';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  getDoctors() {
    return this.repository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.doctor', 'doctor')
      .getMany();
  }
}
