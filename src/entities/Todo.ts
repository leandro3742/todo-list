import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, 
  BaseEntity, JoinTable
} from 'typeorm';

import {Users} from './Users';

@Entity()
export class Todo extends BaseEntity{

  @Column()
  finished: boolean;

  @OneToMany(() =>Users, user => Users.name)
  @JoinTable()
  user: Users;
  
}