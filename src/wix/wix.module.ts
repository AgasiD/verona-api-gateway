import { Module } from '@nestjs/common';
import { WixService } from './wix.service';
import { WixController } from './wix.controller';
import { HttpService } from 'src/common/http/http.service';

@Module({
  controllers: [WixController],
  providers: [HttpService, WixService],
})
export class WixModule {}
