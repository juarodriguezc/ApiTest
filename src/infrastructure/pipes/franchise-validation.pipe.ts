import { PipeTransform, BadRequestException } from '@nestjs/common';
import {
  FRANCHISES,
  type Franchise,
} from '@src/application/types/franchise.type';

export class FranchiseValidationPipe implements PipeTransform {
  transform(value: string): Franchise {
    if (!Object.values(FRANCHISES).includes(value as Franchise)) {
      throw new BadRequestException(`Invalid franchise: ${value}`);
    }
    return value as Franchise;
  }
}
