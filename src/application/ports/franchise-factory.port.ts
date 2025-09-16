import { Franchise } from '@src/application/types/franchise.type';
import { FranchiseAdapterPort } from '@src/application/ports/franchise-adapter.port';

export abstract class FranchiseFactoryPort {
  abstract getAdapter(franchise: Franchise): FranchiseAdapterPort;
}
