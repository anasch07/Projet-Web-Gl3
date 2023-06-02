import { Content } from 'src/content/entities/content.entity';
import { QuizSubmission } from 'src/quiz-submission/entities/quiz-submission.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { QuizQuestion } from '../../quiz-question/entities/quiz-question.entity';
import { BaseEntity } from 'src/common/base-entity';

@Entity()
@ObjectType({description: 'quiz'})
export class Quiz extends BaseEntity {
  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  scheduleDate: Date;

  @Column()
  @Field()
  deadlineDate: Date;

  @Field((type) => [QuizSubmission])
  @OneToMany((type) => QuizSubmission, (sub) => sub.quiz)
  submissions: QuizSubmission[];

  @Field()
  @Column()
  chaptreId:string

  @Field((type) => Content)
  @ManyToOne((type) => Content)
  @JoinColumn({name: "chaptreId"})
  chaptre: Content;

  @Field((type) => [QuizQuestion])
  @OneToMany((type) => QuizQuestion, (question) => question.quiz, {
    eager: true,
  })
  questions: QuizQuestion[];
}
