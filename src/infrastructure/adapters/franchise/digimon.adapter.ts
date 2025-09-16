import { Injectable } from '@nestjs/common';
import { GetDataOutput } from '@src/application/dtos/get-data/get-data.output';
import { FranchiseAdapterPort } from '@src/application/ports/franchise-adapter.port';
import { HttpPort } from '@src/application/ports/http.port';
import { ExternalApiConfig } from '@src/application/types/external-api-config.type';
import { DigimonMetadata } from '@src/application/types/metadata.type';
import { GetDigimonResponseDto } from '@src/infrastructure/dtos/digimon/get-digimon.response';

@Injectable()
export class DigimonAdapter implements FranchiseAdapterPort {
  constructor(private readonly httpPort: HttpPort) {}
  async getData(params: {
    metadata: DigimonMetadata;
    config: ExternalApiConfig;
  }): Promise<GetDataOutput> {
    const { metadata, config } = params;
    const { id } = metadata;
    const { baseUrl, ...options } = config;

    const url = `${baseUrl}/api/v1/digimon/${encodeURIComponent(id)}`;
    const digimonResponse = await this.httpPort.get<GetDigimonResponseDto>(
      url,
      options,
    );

    return {
      name: digimonResponse.name,

      evolutions: [
        ...(digimonResponse.priorEvolutions.map((e) => e.digimon) ?? []),
        ...(digimonResponse.nextEvolutions.map((e) => e.digimon) ?? []),
      ],
      powers: digimonResponse.skills.map((s) => s.skill) ?? [],
    };
  }
}
