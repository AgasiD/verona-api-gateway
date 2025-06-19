import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { NATS_SERVICE } from 'src/config/services';

@Controller('/controles')
export class ControlesController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {

  }

  @Get('/tareas/extras/:etapaId/:subetapaId/:obraId')
  async tareasExtras(@Param('etapaId') etapaId: string, @Param('subetapaId') subetapaId: string) {
    try {

      return firstValueFrom(this.client.send('tareas.obtenerTareasExtras', { subetapaId }))

    } catch (err) {

      throw new RpcException(err.message)
    }
  }

   @Get('/etapas/extras')
  async etapasExtras() {
    try {

      return firstValueFrom(this.client.send('etapas.extras', { }))

    } catch (err) {

      throw new RpcException(err.message)
    }
  }




}
