import { GetDataOutput } from '@src/application/dtos/get-data/get-data.output';
import { ExternalApiConfig } from '@src/application/types/external-api-config.type';
import {
  DigimonMetadata,
  PokemonMetadata,
} from '@src/application/types/metadata.type';

export abstract class FranchiseAdapterPort {
  abstract getData(params: {
    metadata: PokemonMetadata | DigimonMetadata;
    config: ExternalApiConfig;
  }): Promise<GetDataOutput>;
}
