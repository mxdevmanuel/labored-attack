import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from './user.entity';

@Entity('snippet')
export class Snippet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 50 })
  title!: string;

  @Column('varchar', { length: 50 })
  language!: string;

  @Column('text')
  code!: string;

  @ManyToOne(() => User, (user) => user.snippets)
  owner!: User;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}
