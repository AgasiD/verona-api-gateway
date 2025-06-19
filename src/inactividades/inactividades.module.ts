import { Module } from '@nestjs/common';
import { InactividadesService } from './inactividades.service';
import { InactividadesController } from './inactividades.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [InactividadesController],
  providers: [InactividadesService],
  imports: [NatsModule]
})
export class InactividadesModule {}
