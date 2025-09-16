export class GetPokemonResponseDto {
  name: string;
  abilities: { ability: { name: string } }[];
  weight?: number;
  species: { name: string; url: string };
}
