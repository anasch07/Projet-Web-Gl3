import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../enums/role.enum';
import { QuizSubmission } from 'src/quiz-submission/entities/quiz-submission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @OneToMany(type => QuizSubmission, sub => sub.quiz, {eager: true})
  submissions: QuizSubmission[]
  
  @Column({ type: 'enum', enum: Role, default: Role.Student })
  role: Role;
  
  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({ default: true })
  isActive: boolean;
}
