import { Body, Controller, Delete, Inject, Logger, Param, Post, Put } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('pedidos')
export class PedidosController {
    logger: Logger;

    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {
        this.logger = new Logger('Pedidos controller')
    }

    @Put('actualizarPedido')
    async actualizarPedido(@Body() pedidoDTO: any) {
        try {

            return await firstValueFrom(this.client.send('pedidos.actualizarPedidoObra', { pedidoDTO }))

        } catch (err) {
            this.logger.error(err)
            throw err
        }
    }

    @Post('obtenerPedidosByDelivery')
    async obtenerPedidosByDelivery(@Body() data: any) {
        try {

            return await firstValueFrom(this.client.send('pedidos.obtenerPedidosByDelivery', { data }))

        } catch (err) {
            this.logger.error(err)
            throw err
        }
    }


    @Post('obtenerPedidosById')
    async obtenerPedidosByUsuario(@Body() data: any) {
        try {

            return await firstValueFrom(this.client.send('pedidos.obtenerPedidosByUsuario', { data }))

        } catch (err) {
            this.logger.error(err)
            throw err
        }
    }

    @Post('agregarPedido')
    async agregarPedido(@Body() pedido: any) {
        try {

            return await firstValueFrom(this.client.send('pedidos.agregarPedido', { pedido }))

        } catch (err) {
            this.logger.error(err)
            throw err
        }
    }


    @Put('cerrarPedido/:pedidoId')
    async cerrarPedido(@Param('pedidoId') pedidoId: string) {
        try {
            return await firstValueFrom(this.client.send('obras.cerrarPedido', { pedidoId }))
        } catch (err) {
            this.logger.error(err)
            throw err
        }
    }


    @Delete('borrarPedido/:pedidoId')
    async borrarPedido(@Param('pedidoId') pedidoId: string) {
        try {

            return await firstValueFrom(this.client.send('obras.borrarPedido', { pedidoId }))

        } catch (err) {
            this.logger.error(err)
            throw err
        }
    }
}
