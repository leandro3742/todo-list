import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, 
  BaseEntity, JoinTable
} from 'typeorm';

import {Users} from './Users';

@Entity()
export class Todo extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
  
  @Column()
  finished: boolean;

  @OneToMany(() =>Users, user => user.first_name)
  user: Users;
  
}