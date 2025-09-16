import { IsString, IsNotEmpty } from 'class-validator';

export class ExternalApiConfigDto {
  @IsString()
  @IsNotEmpty()
  baseUrl: string;

  [key: string]: unknown;
}
