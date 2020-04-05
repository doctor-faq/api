import { Repository, DeepPartial } from 'typeorm';

export abstract class CrudService<T> {
  constructor(protected repository: Repository<T>) {}

  save(data: DeepPartial<T>) {
    return this.repository.save(data);
  }

  update(data: DeepPartial<T>) {
    return this.repository.save(data);
  }

  deleteById(id: string) {
    return this.repository.delete(id);
  }

  findById(id: string) {
    return this.repository.findOne(id);
  }

  findAll() {
    return this.repository.find();
  }
}
