import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from '../lib/base.entity';
import { Doctor } from './doctor.entity';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

@Entity()
export class User extends EntityBase {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Column()
  name: string;

  @IsPhoneNumber('BR')
  @IsNotEmpty()
  @ApiProperty()
  @Column({ unique: true })
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Column()
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  @Column({
    default: false,
  })
  isAdmin: boolean;

  @OneToOne(
    () => Doctor,
    doctor => doctor.user,
    {
      eager: true,
      cascade: true,
    },
  )
  doctor: Doctor;
}
