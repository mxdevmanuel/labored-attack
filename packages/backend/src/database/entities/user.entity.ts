import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Snippet } from './snippet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 50, unique: true })
  username!: string;

  @Column('text')
  password!: string;

  @OneToMany(() => Snippet, (snippet) => snippet.owner)
  snippets!: Snippet[];

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}
