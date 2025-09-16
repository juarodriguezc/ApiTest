import { Franchise } from '@src/application/types/franchise.type';

export abstract class LoggerPort {
  abstract log(
    message: string | null,
    context: string,
    franchise: Franchise,
    version: string,
    metadata: Record<string, unknown>,
  ): Promise<void>;

  abstract error(
    message: string | null,
    context: string,
    franchise: Franchise,
    version: string,
    metadata: Record<string, unknown>,
  ): Promise<void>;
}
