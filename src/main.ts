import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Pipes
  app.useGlobalPipes(new ValidationPipe({}));

  // WebSocket Adapter
  app.useWebSocketAdapter(new WsAdapter(app));

  // Opções do Swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Askmed')
    .setDescription('API para o aplicativo Askmed.')
    .setVersion('1.0.0')
    .build();

  // Cria e serve a documentação criada pelo Swagger
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap();
