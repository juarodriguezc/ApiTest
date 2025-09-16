import { Injectable } from '@nestjs/common';
import { Franchise, FRANCHISES } from '@src/application/types/franchise.type';
import { PokemonAdapter } from '@src/infrastructure/adapters/franchise/pokemon.adapter';
import { FranchiseAdapterPort } from '@src/application/ports/franchise-adapter.port';
import { DigimonAdapter } from '@src/infrastructure/adapters/franchise/digimon.adapter';

@Injectable()
export class FranchiseFactory {
  private adapters: Record<Franchise, FranchiseAdapterPort>;
  constructor(pokemonAdapter: PokemonAdapter, digimonAdapter: DigimonAdapter) {
    this.adapters = {
      [FRANCHISES.POKEMON]: pokemonAdapter,
      [FRANCHISES.DIGIMON]: digimonAdapter,
    };
  }
  getAdapter(franchise: Franchise) {
    const adapter = this.adapters[franchise];
    if (!adapter) {
      throw new Error(`Adapter not found for franchise: ${franchise}`);
    }
    return adapter;
  }
}
