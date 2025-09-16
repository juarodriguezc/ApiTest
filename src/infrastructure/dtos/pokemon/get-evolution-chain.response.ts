export class GetEvolutionChainResponseDto {
  chain: EvolutionNode;
}

export class EvolutionNode {
  species: { name: string };
  evolves_to: EvolutionNode[];
}
