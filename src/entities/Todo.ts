import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, 
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

  @ManyToOne(() =>Users, user => user.id)
  user: Users;  
  
}