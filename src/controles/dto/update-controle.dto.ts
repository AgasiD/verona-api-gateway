import { PartialType } from '@nestjs/mapped-types';
import { CreateControleDto } from './create-controle.dto';

export class UpdateControleDto extends PartialType(CreateControleDto) {
  id: number;
}
