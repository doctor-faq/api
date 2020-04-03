import { EntityBase } from 'src/lib/base.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class Doctor extends EntityBase {
  @JoinColumn()
  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Column()
  crm: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Column()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Column()
  speciality: string;

  @IsBoolean()
  @ApiProperty()
  @Column({
    nullable: true,
  })
  validated: boolean;
}
