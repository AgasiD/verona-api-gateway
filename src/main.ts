import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-exception.filter';
import { envs } from './config/envs';

async function bootstrap() {
  const logger = new Logger('API-Gateway: Main');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false
    }));
  app.useGlobalFilters(new RpcCustomExceptionFilter())
  logger.log(`API Gateway is running on port ${envs.port ?? 3000}`);
  await app.listen(envs.port ?? 3000);

}
bootstrap();
