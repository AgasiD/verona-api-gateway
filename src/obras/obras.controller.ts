import { Controller, Get, Post, Put, Delete, Param, Body, Inject, Logger, HttpException, } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MyResponse } from 'src/common/entities/entities/httpResponse.entity';
import { NATS_SERVICE } from 'src/config/services';
import { CreateInactividadDTO } from './dto/create-inactividad.dto';
import { handleHttpErrors } from 'src/common/exceptions/http-expeptions';

@Controller('obras')
export class ObrasController {

  logger: Logger;
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {
    this.logger = new Logger('Obras controller')
  }

  // ----------- GET -----------

  @Get('/')
  async obtenerObras() {
    try {

      return await firstValueFrom(this.client.send('obras.obtenerObras', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }
  @Get('byUser/:userId')
  async obtenerObrasByUser(@Param('userId') userId: string) {
    try {

      return await firstValueFrom(this.client.send('obras.byUser', { userId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('obtenerInactividadesPorObras')
  async obtenerInactividadesPorObras() {
    try {

      return await firstValueFrom(this.client.send('obras.obtenerInactividadesPorObras', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('pedidos/:obraId')
  async obtenerPedidos(@Param('obraId') obraId: string) {
    try {

      return await firstValueFrom(this.client.send('obras.obtenerPedidos', { obraId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }
  @Get('pedidosCerrados/:obraId')
  async obtenerPedidosCerrados(@Param('obraId') obraId: string) {
    try {

      return await firstValueFrom(this.client.send('obras.obtenerPedidosCerrados', { obraId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }


  @Get('obtenerPedido/:pedidoId')
  async obtenerPedido(@Param('pedidoId') pedidoId: string) {
    try {

      return await firstValueFrom(this.client.send('obras.obtenerPedido', { pedidoId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('obtenerPedidosObras/:usuarioId')
  async obtenerPedidosPorObra(@Param('usuarioId') usuarioId: string) {
    try {

      return await firstValueFrom(this.client.send('obras.obtenerPedidosObras', { usuarioId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }


  @Get('obtenerTareasExtras') //TODO
  async obtenerTareasExtras(@Param('etapaId') etapaId: string, @Param('subetapaId') subetapaId: string, @Param('obraId') obraId?: string) {
    try {

      return await firstValueFrom(this.client.send('obras.obtenerTareasExtras', { etapaId, subetapaId, obraId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }


  @Post('/:obraId')
  async obtenerObra(@Param('obraId') obraId: string) {
    try {
      return await firstValueFrom(this.client.send('obras.obtenerObra', { obraId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('/controlObra/:obraId')
  async controlObra(@Param('obraId') obraId: string) {
    try {
      return await firstValueFrom(this.client.send('obras.controlObra', { obraId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  // ----------- POST -----------


  @Post()
  async crearObra(@Body() dto: any) {
    try {

      return await firstValueFrom(this.client.send('obras.crearObra', dto))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Post('/etapa/extra')
  async agregarEtapa(@Body() dto: any) {

    try {
      return await firstValueFrom(this.client.send('obras.agregarEtapa', dto))
    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }




  // ----------- PUT -----------

  @Put('enabledFiles/:obraId')
  async addEnabledFiles(@Param('obraId') obraId: string, @Body() dto: any) {
    try {
      return await firstValueFrom(this.client.send('obras.crearObra', { ...dto, obraId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }
  

  @Put()
  async modificarObra(@Body() dto: any) {
    try {
      const data = await firstValueFrom(this.client.send('obras.modificarObra', dto))
      return data

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Put('quitarUsuario/:obraId/:usuarioId')
  async quitarUsuario(@Param('obraId') obraId: string, @Param('usuarioId') usuarioId: string) {
    try {

      return await firstValueFrom(this.client.send('obras.quitarUsuario', { obraId, usuarioId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Put('actualizaTarea/:obraId')
  async actualizaTarea(@Param('obraId') obraId: string, @Body() dto: any) {
    try {

      return await firstValueFrom(this.client.send('obras.actualizaTarea', { obraId, ...dto }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Put('agregarUsuario/:obraId/:usuarioId')
  async agregarUsuario(@Param('obraId') obraId: string, @Param('usuarioId') usuarioId: string) {
    try {

      return await firstValueFrom(this.client.send('obras.agregarUsuario', { obraId, usuarioId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Put('asignarTarea')
  async asignarTarea(@Body() dto: any) {
    try {

      return await firstValueFrom(this.client.send('obras.asignarTarea', dto))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Put('quitarTarea')
  async quitarTarea(@Body() dto: any) {
    try {

      return await firstValueFrom(this.client.send('obras.quitarTarea', dto))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Put('agregarTarea')
  async agregarTareaObra(@Body() tarea) {
    try {

      return await firstValueFrom(this.client.send('obras.agregarTarea', tarea))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Put('asignarEtapa')
  async asignarEtapa(@Body() dto: any) {
    try {

      return await firstValueFrom(this.client.send('obras.asignarEtapa', dto))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Put('quitarEtapa')
  async quitarEtapa(@Body() dto: any) {
    try {

      return await firstValueFrom(this.client.send('obras.quitarEtapa', dto))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Put('quitarSubetapa')
  async quitarSubetapa(@Body() dto: any) {
    try {

      return await firstValueFrom(this.client.send('obras.quitarSubetapa', dto))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Put('actualizarIdDrive')
  async actualizarIdDrive(@Body() dto: any) {
    try {

      return await firstValueFrom(this.client.send('obras.actualizarIdDrive', dto))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Put('asignarSubetapa')
  async asignarSubetapa(@Body() dto: any) {
    try {

      return await firstValueFrom(this.client.send('obras.asignarSubetapa', dto))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Put('actualizarOrdenTareas/:obraId')
  async actualizarOrdenTareas(@Param('obraId') obraId: string, @Body() dto: any) {
    try {

      return await firstValueFrom(this.client.send('obras.actualizarOrdenTareas', { obraId, dto }))
      
    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }

  @Delete(':obraId')
  async eliminarObra(@Param('obraId') obraId: string) {
    try {

      return await firstValueFrom(this.client.send('obras.eliminarObra', { obraId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }



  // ----------- INACTIVIDADES -----------


  @Post('inactividad/:obraId')
  async nuevaInactividad(@Param('obraId') obraId: string, @Body() dto: CreateInactividadDTO) {
    try {

      return await firstValueFrom(this.client.send('obras.nuevaInactividad', { obraId, ...dto }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }


  @Post('inactividadMasiva')
  async nuevaInactividadMasiva(@Body() dto: any) {
    try {
      return await firstValueFrom(this.client.send('obras.inactividadMasiva', dto))
    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }


  @Put('inactividad/:obraId')
  async editInactividad(@Param('obraId') obraId: string, @Body() dto: any) {
    try {
      return await firstValueFrom(this.client.send('obras.updateInactividad', { obraId, ...dto }))
    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }


  @Delete('inactividad/:obraId/:inactividadId')
  async eliminarInactividad(@Param('obraId') obraId: string, @Param('inactividadId') inactividadId: string) {
    try {
      return await firstValueFrom(this.client.send('obras.updateInactividad', { obraId, inactividadId }))
    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)

    }
  }


}