import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
