import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetDataUseCase } from '@src/application/use-cases/get-data.use-case';
import { FranchiseFactoryPort } from '@src/application/ports/franchise-factory.port';
import { HttpPort } from '@src/application/ports/http.port';
import { LoggerPort } from './application/ports/logger.port';
import { AppController } from '@src/infrastructure/controllers/app.controller';
import { FranchiseFactory } from '@src/infrastructure/adapters/franchise-factory/franchise-port.factory';
import { PokemonAdapter } from '@src/infrastructure/adapters/franchise/pokemon.adapter';
import { DigimonAdapter } from '@src/infrastructure/adapters/franchise/digimon.adapter';
import { AxiosHttpAdapter } from '@src/infrastructure/adapters/http/axios-http.adapter';
import { LoggerAdapter } from '@src/infrastructure/adapters/logger/logger-adapter';
import { Log } from '@src/infrastructure/database/entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'persistence/logs.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Log]),
  ],
  controllers: [AppController],
  providers: [
    GetDataUseCase,
    FranchiseFactory,
    PokemonAdapter,
    DigimonAdapter,
    {
      provide: FranchiseFactoryPort,
      useClass: FranchiseFactory,
    },
    {
      provide: HttpPort,
      useClass: AxiosHttpAdapter,
    },
    {
      provide: LoggerPort,
      useClass: LoggerAdapter,
    },
  ],
})
export class AppModule {}
