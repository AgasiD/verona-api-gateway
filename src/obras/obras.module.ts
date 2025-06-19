import { Module } from '@nestjs/common';
import { ObrasController } from './obras.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [ObrasController],
  imports: [NatsModule],
})
export class ObrasModule {}
