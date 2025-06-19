import { Module } from '@nestjs/common';
import { ControlesController } from './controles.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [ControlesController],
  imports: [NatsModule]
})
export class ControlesModule {}
