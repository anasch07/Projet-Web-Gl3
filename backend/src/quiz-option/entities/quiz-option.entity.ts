import { BaseEntity } from 'src/common/base-entity';
import { QuizQuestion } from 'src/quiz-question/entities/quiz-question.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import {  JoinColumn } from 'typeorm';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
@Entity()
@ObjectType({description: 'quizOption'})
export class QuizOption extends BaseEntity {
  @Column()
  @Field()
  display: string;

  @Column()
  @Field()
  questionId: string;
  

//,{onDelete:'CASCADE'}
  @Field() 
  @ManyToOne(() => QuizQuestion, (ques) => ques.options,{onDelete:'CASCADE'})
  @JoinColumn({name: "questionId"})
  question: QuizQuestion;

  @Field()
  @Column({ default: false })
  isCorrect: boolean;
}
