import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Inject, Logger, HttpException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { MyResponse } from 'src/common/entities/entities/httpResponse.entity';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { handleHttpErrors } from 'src/common/exceptions/http-expeptions';

@Controller('usuarios')
export class UsuariosController {
  logger: Logger;

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {
    this.logger = new Logger('Obras controller')

  }

  @Get('/')
  async obtenerUsuarios() {
    try {

      const data = await firstValueFrom(this.client.send('usuarios.obtenerUsuarios', {}).pipe(timeout(5000)))
      return data

    } catch (err) {
      handleHttpErrors(err)
    }
  }


  @Get('/usuario/:usuarioId')
  async obtenerUsuario(@Param('usuarioId') usuarioId: string) {
    try {

      const data = await firstValueFrom(this.client.send('usuarios.obtenerUsuario', { usuarioId }))
      return data

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('propadmin')
  async obtenerPropAdmin() {
    try {

      return await firstValueFrom(this.client.send('usuarios.propadmin', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('obtenerChatsExternoUsuario/:id')
  async obtenerChatsExternoUsuario(@Param('id') id: string) {
    try {

      return await firstValueFrom(this.client.send('usuarios.obtenerChatsExternoUsuario', { id }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }


  @Get('admin')
  async obtenerPMO() {
    try {

      return await firstValueFrom(this.client.send('usuarios.admin', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('pm')
  async obtenerPM() {
    try {

      return await firstValueFrom(this.client.send('usuarios.pm', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('arquitecto')
  async obtenerArquitectos() {
    try {

      return await firstValueFrom(this.client.send('usuarios.arquitecto', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('propietarios')
  async obtenerPropietarios() {
    try {

      return await firstValueFrom(this.client.send('usuarios.propietarios', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('obrero')
  async obtenerObreros() {
    try {

      return await firstValueFrom(this.client.send('usuarios.obrero', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('compradores')
  async obtenerCompradores() {
    try {

      return await firstValueFrom(this.client.send('usuarios.compradores', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Post('profesionales')
  async obtenerProfesionales() {
    try {
      const data = await firstValueFrom(this.client.send('usuarios.profesionales', {}))
      return data

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('usuariosAll')
  async obtenerUsuariosAll() {
    try {

      return await firstValueFrom(this.client.send('usuarios.usuariosAll', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('getNotifications/:usuarioId')
  async obtenerNotifificacionesByUser(@Param('usuarioId') usuarioId: string) {
    try {

      return await firstValueFrom(this.client.send('usuarios.getNotifications', { usuarioId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('usuariosConChat/:usuarioId')
  async obtenerUsuariosConChat(@Param('usuarioId') usuarioId: string) {
    try {

      return await firstValueFrom(this.client.send('usuarios.usuariosConChat', { usuarioId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Get('anotacionByObra/:usuarioId')
  async anotacionesByObra(@Param('usuarioId') usuarioId: string) {
    try {

      return await firstValueFrom(this.client.send('usuarios.anotacionesByObra', { usuarioId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }


  @Post()
  async crearUsuario(@Body() dto: CreateUsuarioDto) {
    try {

      return await firstValueFrom(this.client.send('usuarios.crearUsuario', dto))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Post('login')
  async login(@Body() dto: CreateUsuarioDto) {
    try {

      return await firstValueFrom(this.client.send('usuarios.login', dto))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Post('tokenDevice')
  async registrarDispositivo(@Body() body: any) {
    try {

      return await firstValueFrom(this.client.send('usuarios.tokenDevice', body))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }


  @Post('reload')
  async recargarUsuarios() {
    try {

      return await firstValueFrom(this.client.send('usuarios.reload', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Post('agregarAnotacion/:usuarioId')
  async agregarAnotacion(@Param('usuarioId') usuarioId: string, @Body() data: any) {
    try {

      return await firstValueFrom(this.client.send('usuarios.agregarAnotacion', { usuarioId, ...data }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Post('eliminarAnotacion/:usuarioId')
  async eliminarAnotacion(@Param('usuarioId') usuarioId: string, @Body() data: any) {
    try {

      return await firstValueFrom(this.client.send('usuarios.eliminarAnotacion', { usuarioId, anotId: data.id }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Delete('deleteAllDevice') //Admin
  async deleteAllDevice() {
    try {

      return await firstValueFrom(this.client.send('usuarios.deleteAllDevice', {}))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Delete('deleteAllDeviceByUsuario/:usuarioId') //Admin
  async deleteAllDeviceByUsuario(@Param('usuarioId') usuarioId: string) {
    try {

      return await firstValueFrom(this.client.send('usuarios.deleteAllDeviceByUsuario', { usuarioId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Put('password') // TODO instalar guard para que el token sea del id del usuario
  async cambiarPassword(@Body() data: any) {
    try {

      return await  (this.client.send('auth.cambiarPassword', data))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Put('leerNotificaciones/:usuarioId')
  async leerNotificaciones(@Param('usuarioId') usuarioId: string) {
    try {

      return await firstValueFrom(this.client.send('usuarios.leerNotificaciones', { usuarioId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  // @Put('ultimoMensajeLeido/:usuarioId')
  // ultimoMensajeLeido(@Param('usuarioId') id: string) {
  //   return this.usuariosService.ultimoMensajeLeido(id);
  // }

  // @Put('deleteDevice')
  // deleteDevice(@Body() data: any) {
  //   return this.usuariosService.deleteDevice(data); TODO
  // }

  @Put('update/:usuarioId')
  async modificarUsuario(@Param('usuarioId') usuarioId: string, @Body() data: any) {
    try {

      return await firstValueFrom(this.client.send('usuarios.actualizar', { usuarioId, ...data }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Put('modificarAnotacion/:usuarioId')
  async modificarAnotacion(@Param('usuarioId') usuarioId: string, @Body() data: any) {
    try {

      return await firstValueFrom(this.client.send('usuarios.modificarAnotacion', { usuarioId, ...data }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }

  @Delete('desactivarUsuario/:usuarioId')
  async desactivarUsuario(@Param('usuarioId') usuarioId: string) {
    try {

      return await firstValueFrom(this.client.send('usuarios.desactivarUsuario', { usuarioId }))

    } catch (err) {
      this.logger.error(err)
      handleHttpErrors(err)
    }
  }


}