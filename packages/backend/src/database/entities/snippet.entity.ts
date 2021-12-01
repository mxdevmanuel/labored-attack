import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('snippet')
export class Snippet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 50, nullable: true })
  title!: string;

  @Column('varchar', { length: 50 })
  language!: string;

  @Column('text')
  code!: string;

  @ManyToOne(() => User, (user) => user.snippets)
  owner!: User;

  @RelationId((snippet: Snippet) => snippet.owner)
  ownerId!: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}
