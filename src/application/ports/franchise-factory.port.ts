import { Franchise } from '../types/franchise.type';
import { FranchiseAdapterPort } from './franchise-adapter.port';

export abstract class FranchiseFactoryPort {
  abstract getAdapter(franchise: Franchise): FranchiseAdapterPort;
}
