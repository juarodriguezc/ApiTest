import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerPort } from '@src/application/ports/logger.port';
import { Franchise } from '@src/application/types/franchise.type';
import { STATUSES } from '@src/application/types/status.type';
import { Log } from '@src/infrastructure/database/entities/log.entity';

@Injectable()
export class LoggerAdapter implements LoggerPort {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(Log)
    private readonly logRepo: Repository<Log>,
  ) {}

  async log(
    message: string | null,
    context: string,
    franchise: Franchise,
    version: string,
    metadata: Record<string, unknown>,
  ): Promise<void> {
    this.logger.log(message, context);
    const log = this.logRepo.create({
      franchise,
      version,
      metadata: JSON.stringify(metadata),
      status: STATUSES.SUCCESS,
    });
    await this.logRepo.save(log);
  }

  async error(
    message: string | null,
    context: string,
    franchise: Franchise,
    version: string,
    metadata: Record<string, unknown>,
  ): Promise<void> {
    this.logger.error(message, context);
    const log = this.logRepo.create({
      franchise,
      version,
      metadata: JSON.stringify(metadata),
      status: STATUSES.FAIL,
      message,
    });
    await this.logRepo.save(log);
  }
}
