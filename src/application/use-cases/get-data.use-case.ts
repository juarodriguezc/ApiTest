import { Injectable } from '@nestjs/common';
import { GetDataInput } from '@src/application/dtos/get-data/get-data.input';
import { GetDataOutput } from '@src/application/dtos/get-data/get-data.output';
import { FranchiseFactoryPort } from '@src/application/ports/franchise-factory.port';
import { LoggerPort } from '@src/application/ports/logger.port';

@Injectable()
export class GetDataUseCase {
  constructor(
    private readonly franchiseFactoryPort: FranchiseFactoryPort,
    private readonly logger: LoggerPort,
  ) {}
  async execute(input: GetDataInput): Promise<GetDataOutput> {
    const { franchise, version, metadata, config } = input;
    try {
      const adapter = this.franchiseFactoryPort.getAdapter(franchise);
      const output = await adapter.getData({ metadata, config });

      await this.logger.log(
        'Data obtained successfully',
        GetDataUseCase.name,
        franchise,
        version,
        metadata,
      );
      return output;
    } catch (err) {
      await this.logger.error(
        `Error obtaining data: ${(err as Error).message}`,
        GetDataUseCase.name,
        franchise,
        version,
        metadata,
      );
      throw err;
    }
  }
}
