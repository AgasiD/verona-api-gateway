import { Controller, Get, HttpException, Inject, Param } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { handleHttpErrors } from 'src/common/exceptions/http-expeptions';

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

      handleHttpErrors(err)
    }
  }

   @Get('/etapas/extras')
  async etapasExtras() {
    try {

      return firstValueFrom(this.client.send('etapas.extras', { }))

    } catch (err) {

      handleHttpErrors(err)
    }
  }




}
