import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { FindOperator } from 'typeorm';
import { User } from './user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { BaseCrudController } from 'src/lib/crud.controller';
import { Doctor } from './doctor.entity';

@ApiTags('User')
@Controller('users')
export class UserController extends BaseCrudController<User, UserService>(
  User,
  'Usuário',
) {
  constructor(service: UserService) {
    super(service);
  }

  @ApiOperation({
    summary: 'Obtém a lista de todos os profissionais.',
  })
  @ApiOkResponse({
    type: Doctor,
    isArray: true,
    description: 'Lista com todos os profissionais.',
  })
  @Get('professionals')
  getDoctors() {
    return this.service.getDoctors();
  }
}
