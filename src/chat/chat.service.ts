import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/lib/crud.service';
import { Chat } from './chat.entity';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService extends CrudService<Chat> {
  constructor(
    @InjectRepository(Chat) repository: Repository<Chat>,
    @InjectRepository(Message) public msgRepository: Repository<Message>,
  ) {
    super(repository);
  }

  addMessage(msg: Message) {
    return this.msgRepository.save(msg);
  }

  getMessagesByChatId(id: string): Promise<Message[]> {
    return this.msgRepository.find({
      chat: { id },
    });
  }
}
