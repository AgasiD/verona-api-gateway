import { Controller, Get, Param } from '@nestjs/common';
import { WixService } from './wix.service';

@Controller('wix')
export class WixController {
  constructor(private readonly wixService: WixService) {}

  @Get()
  obtenerPosteos(){
    return this.wixService.obtener_posteos()
  }
  @Get('/:idPosteo')
  obtenerPosteo(@Param('idPosteo') idPosteo){
    return this.wixService.obtener_posteo(idPosteo)
  }
}

