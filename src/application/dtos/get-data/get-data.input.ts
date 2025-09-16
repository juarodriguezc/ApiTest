import { ExternalApiConfig } from '@src/application/types/external-api-config.type';
import { Franchise } from '@src/application/types/franchise.type';
import {
  DigimonMetadata,
  PokemonMetadata,
} from '@src/application/types/metadata.type';

export interface GetDataInput {
  franchise: Franchise;
  version: string;
  metadata: PokemonMetadata | DigimonMetadata;
  config: ExternalApiConfig;
}
