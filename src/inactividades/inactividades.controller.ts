import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { InactividadesService } from './inactividades.service';
import { CreateInactividadeDto } from './dto/create-inactividade.dto';
import { UpdateInactividadeDto } from './dto/update-inactividade.dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

@Controller('inactividades')
export class InactividadesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createInactividadeDto: CreateInactividadeDto) {
    return this.client.send('inactividades.grabarInactividad', createInactividadeDto);
  }

  @Get()
  findAll() {
    return this.client.send('inactividades.obtenerInactividades', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('inactividades.obtenerInactividad', { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInactividadeDto: UpdateInactividadeDto) {
    return this.client.send('inactividades.modificarInactividad', updateInactividadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('inactividades.borrarInactividad', { id });
  }
}
