import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, 
  BaseEntity, JoinTable
} from 'typeorm';

import { Todo } from './Todo';

@Entity()
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, toDo => toDo.label)
  toDo: Todo;
  
}