import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Chat } from './chat.entity';
import { BaseCrudController } from '../lib/crud.controller';
import { ChatService } from './chat.service';
import { Message } from './message.entity';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chats')
export class ChatController extends BaseCrudController<Chat, ChatService>(
  Chat,
) {
  constructor(service: ChatService) {
    super(service);
  }

  // TODO REMOVER, SÓ PARA TESTES NO POSTMAN!!!!
  @ApiOperation({
    deprecated: true,
    summary: 'Cadastra uma nova mensagem',
  })
  @Post(':id/messages')
  addTestMessage(@Param('id') id: string, @Body() data: Message) {
    return this.service.addMessage({
      ...data,
      chat: id as any,
    });
  }

  @ApiOperation({
    summary: 'Retorna todas as mensagens de um chat.',
  })
  @ApiOkResponse({
    type: Message,
    isArray: true,
    description: 'Lista de mensagens do chat.',
  })
  @Get(':id/messages')
  getMessagesById(@Param('id') id: string) {
    return this.service.getMessagesByChatId(id);
  }
}
