import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [UsuariosController],
  imports: [NatsModule],

})
export class UsuariosModule { }
