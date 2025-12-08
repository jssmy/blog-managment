import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`Invalid MongoDB ID: ${value}`);
    }

    try {
      return new Types.ObjectId(value); // Convertir y retornar el ObjectId
    } catch (_e) {
      throw new BadRequestException(`Invalid MongoDB ID: ${value}`);
    }
  }
}
