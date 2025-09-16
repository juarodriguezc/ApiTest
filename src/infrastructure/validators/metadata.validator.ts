import { BadRequestException } from '@nestjs/common';
import { Franchise } from '@src/application/types/franchise.type';
import { PokemonMetadataDto } from '@src/infrastructure/dtos/pokemon/pokemon-metadata.dto';
import { DigimonMetadataDto } from '@src/infrastructure/dtos/digimon/digimon-metadata.dto';

export class MetadataValidator {
  static validate(
    franchise: Franchise,
    value: unknown,
  ): PokemonMetadataDto | DigimonMetadataDto {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Metadata must be an object');
    }

    switch (franchise) {
      case 'pokemon': {
        const request = value as PokemonMetadataDto;
        if (!request.name || typeof request.name !== 'string') {
          throw new BadRequestException(
            'Pokemon metadata must have a "name" string property',
          );
        }
        return request;
      }

      case 'digimon': {
        const request = value as DigimonMetadataDto;
        if (!request.id || typeof request.id !== 'number') {
          throw new BadRequestException(
            'Digimon metadata must have an "id" number property',
          );
        }
        return request;
      }

      default:
        throw new BadRequestException(
          `Unknown franchise: ${String(franchise)}`,
        );
    }
  }
}
