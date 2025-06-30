import { Module } from '@nestjs/common';

import { FilesController } from './files.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [FilesController],
  providers: [],
  imports: [NatsModule]
})
export class FilesModule {}
