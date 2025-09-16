import type { Franchise } from '@src/application/types/franchise.type';
import type { Status } from '@src/application/types/status.type';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  franchise: Franchise;

  @Column()
  version: string;

  @Column()
  metadata: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  status: Status;

  @Column({ type: 'text', nullable: true })
  message: string | null;
}
