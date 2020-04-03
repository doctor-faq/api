import { Entity, ManyToOne, Column } from 'typeorm';
import { EntityBase } from 'src/lib/base.entity';
import { Chat } from './chat.entity';
import { User } from 'src/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

@Entity()
export class Message extends EntityBase {
  @ManyToOne(() => Chat, {
    onDelete: 'CASCADE',
  })
  chat: Chat;

  @IsString()
  @IsUUID()
  @ApiProperty()
  @ManyToOne(() => User, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  from: User;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Column()
  message: string;
}
