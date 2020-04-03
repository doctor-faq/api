import { EntityBase } from 'src/lib/base.entity';
import { User } from 'src/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, ManyToOne, Entity, OneToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat extends EntityBase {
  @ApiProperty()
  @ManyToOne(() => User, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  user: User;

  @ApiProperty()
  @ManyToOne(() => User, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  doctor: User;

  @OneToMany(
    () => Message,
    msg => msg.chat,
  )
  messages: Message[];
}
