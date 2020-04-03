import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CrudService } from './crud.service';
import { EntityBase } from './base.entity';
import { DeepPartial } from 'typeorm';

export interface ICrudController<TS, T extends EntityBase> {
  service: TS;

  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(data: DeepPartial<T>): Promise<T>;
  update(id: string, data: DeepPartial<T>): Promise<T>;
  deleteById(id: string): Promise<void>;
}

// Reparo alternativo para exportar a mixin da classe CrudController
type Constructor<T> = new (...args: any[]) => T;

// Mixin da classe BaseCrudController
export function BaseCrudController<
  T extends EntityBase,
  TS extends CrudService<T>
>(
  entity: typeof EntityBase,
  name: string = entity.name,
): Constructor<ICrudController<TS, T>> {
  class CrudController implements ICrudController<TS, T> {
    constructor(public service: TS) {}

    @ApiOperation({
      summary: `Retorna uma lista com todos os dados do ${name}.`,
    })
    @ApiOkResponse({
      type: entity,
      isArray: true,
      description: `Uma lista de ${name}.`,
    })
    @Get()
    findAll() {
      return this.service.findAll();
    }

    @ApiOperation({
      summary: `Cria um novo ${name} com os dados do body.`,
    })
    @ApiOkResponse({
      type: entity,
      description: `Retorna o novo ${name} cadastrado.`,
    })
    @Post()
    create(@Body() data: DeepPartial<T>) {
      delete data.id;
      return this.service.save(data);
    }

    @ApiOperation({
      summary: `Obtém um ${name} através do ID.`,
    })
    @ApiCreatedResponse({
      type: entity,
      description: `Retorna o ${name} consultado.`,
    })
    @Get(':id')
    findById(@Param('id') id: string) {
      return this.service.findById(id);
    }

    @ApiOperation({
      summary: `Atualiza os dados do ${name} utilizando os dados do body.`,
    })
    @ApiOkResponse({
      type: entity,
      description: `Retorna o novo ${name} atualizado.`,
    })
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: DeepPartial<T>) {
      return this.service.save({
        ...data,
        id,
      });
    }

    @ApiOperation({
      summary: `Remove um ${name}.`,
    })
    @ApiNoContentResponse({
      description: `${name} foi removido`,
    })
    @Delete(':id')
    async deleteById(@Param('id') id: string) {
      await this.service.deleteById(id);
    }
  }

  return CrudController;
}
