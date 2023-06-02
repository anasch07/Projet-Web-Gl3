
import { BaseEntity } from 'src/common/base-entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { User } from 'src/user/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType({description: 'quizSubmission'})
export class QuizSubmission extends BaseEntity {
  @Column()
  @Field()
  quizId: string
  
  @Field(() => Quiz)
  @ManyToOne(() => Quiz, (q) => q.submissions, {onDelete:'CASCADE'})
  @JoinColumn({name: "quizId"})
  quiz: Quiz;

  @Column()
  @Field()
  studentId: string

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({name: "studentId"})
  student: User;

  @Column()
  @Field()
  creationDate: Date;

  @Column()
  @Field()
  mark: number;
}
