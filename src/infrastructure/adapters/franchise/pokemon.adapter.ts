import { Injectable } from '@nestjs/common';
import { GetDataOutput } from '@src/application/dtos/get-data/get-data.output';
import { FranchiseAdapterPort } from '@src/application/ports/franchise-adapter.port';
import { HttpPort } from '@src/application/ports/http.port';
import { ExternalApiConfig } from '@src/application/types/external-api-config.type';
import { PokemonMetadata } from '@src/application/types/metadata.type';
import {
  EvolutionNode,
  GetEvolutionChainResponseDto,
} from '@src/infrastructure/dtos/pokemon/get-evolution-chain.response';
import { GetPokemonSpeciesResponseDto } from '@src/infrastructure/dtos/pokemon/get-pokemon-species.response';
import { GetPokemonResponseDto } from '@src/infrastructure/dtos/pokemon/get-pokemon.response';

@Injectable()
export class PokemonAdapter implements FranchiseAdapterPort {
  constructor(private readonly httpPort: HttpPort) {}
  async getData(params: {
    metadata: PokemonMetadata;
    config: ExternalApiConfig;
  }): Promise<GetDataOutput> {
    const { metadata, config } = params;
    const { baseUrl, ...options } = config;

    const url = `${baseUrl}/pokemon/${encodeURIComponent(metadata.name)}`;

    const pokemonResponse = await this.httpPort.get<GetPokemonResponseDto>(
      url.toString(),
      options,
    );
    const speciesResponse =
      await this.httpPort.get<GetPokemonSpeciesResponseDto>(
        pokemonResponse.species.url,
        options,
      );

    const evolutionChainResponse =
      await this.httpPort.get<GetEvolutionChainResponseDto>(
        speciesResponse.evolution_chain.url,
        options,
      );

    return {
      name: pokemonResponse.name,
      evolutions: this.getEvolutions(evolutionChainResponse.chain),
      powers: pokemonResponse.abilities.map((a) => a.ability.name) ?? [],
      weight: pokemonResponse.weight,
    };
  }
  private getEvolutions(node: EvolutionNode): string[] {
    const evolutions: string[] = [];
    for (const evo of node.evolves_to) {
      evolutions.push(evo.species.name);
      evolutions.push(...this.getEvolutions(evo));
    }
    return evolutions;
  }
}
