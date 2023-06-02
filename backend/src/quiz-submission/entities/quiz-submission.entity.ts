import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class QuizSubmission extends BaseEntity {
  @Column()
  quizId: string

  @ManyToOne(() => Quiz, (q) => q.submissions, {onDelete:'CASCADE'})
  @JoinColumn({name: "quizId"})
  quiz: Quiz;

  @Column()
  studentId: string

  @ManyToOne(() => User)
  @JoinColumn({name: "studentId"})
  student: User;

  @Column()
  creationDate: Date;

  @Column()
  mark: number;
}
