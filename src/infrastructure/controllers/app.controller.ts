import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import type { Franchise } from '@src/application/types/franchise.type';
import { ExternalApiConfigDto } from '@src/infrastructure/dtos/external-api-config.dto';
import { FranchiseValidationPipe } from '@src/infrastructure/pipes/franchise-validation.pipe';
import { ParseJsonPipe } from '@src/infrastructure/pipes/parse-json.pipe';
import { GetDataUseCase } from '@src/application/use-cases/get-data.use-case';
import { GetDataOutput } from '@src/application/dtos/get-data/get-data.output';
import { MetadataValidator } from '@src/infrastructure/validators/metadata.validator';

@Controller('api')
export class AppController {
  constructor(private readonly getDataUseCase: GetDataUseCase) {}
  @Get(':franchise/:version')
  async getData(
    @Param('franchise', new FranchiseValidationPipe())
    franchise: Franchise,
    @Param('version') version: string,
    @Query('metadata', new ParseJsonPipe())
    metadata: Record<string, unknown>,
    @Query(
      'config',
      new ParseJsonPipe(),
      new ValidationPipe({ transform: true }),
    )
    config: ExternalApiConfigDto,
  ): Promise<GetDataOutput> {
    const mappedMetadata = MetadataValidator.validate(franchise, metadata);
    return this.getDataUseCase.execute({
      franchise,
      version,
      metadata: mappedMetadata,
      config,
    });
  }
}
