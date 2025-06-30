import {
  BadRequestException,
  Body,
  Controller, Get, Inject, NotFoundException, Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { memoryStorage } from 'multer';
import { handleHttpErrors } from 'src/common/exceptions/http-expeptions';

@Controller('files')
export class FilesController {


  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {
  }


  @Get('documentos/:usuarioId/:folderId')
  async obtenerDocuementos(@Param('usuarioId') usuarioId: string, @Param('folderId') folderId: string) {
    try {

      return await firstValueFrom(this.client.send('files.getFiles', { usuarioId, folderId }));
    } catch (err) {

      handleHttpErrors(err)
    }
  }

  @Post('/:fileId/:extension/:parent')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage()
    }),
  )
  async subirImagen(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: any,
    @Param('fileId') nombre: string,
    @Param('extension') extension: string,
    @Param('parent') parentFolderId: string) {
    try {

      if (!file) throw new BadRequestException('No se ha subido ningun archivo');
      let data = await firstValueFrom(this.client.send('files.newFile', { nombre, parentFolderId, extension, file }));
      res.status(201).json({
        
        id: data.id,
        message: 'Archivo subido correctamente',
      });

    } catch (err) {
      // this.logger.error(err)
      handleHttpErrors(err)
    }
  }


  @Post('file/:nombre/:parentFolderId')
  async crearArchivo(
    @Param('nombre') nombre: string,
    @Param('parentFolderId') parentFolderId: string,
  ) {
    throw new NotFoundException('Funcion no implementada');

  }

  @Post('folder/:nombre/:parentId')
  async crearCarpeta() {
    throw new NotFoundException('Funcion no implementada');
  }


}
