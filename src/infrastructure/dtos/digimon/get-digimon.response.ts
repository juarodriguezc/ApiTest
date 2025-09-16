export class GetDigimonResponseDto {
  name: string;
  priorEvolutions: { digimon: string }[];
  nextEvolutions: { digimon: string }[];
  skills: { skill: string }[];
}
