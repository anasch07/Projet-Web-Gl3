import { BaseEntity } from 'src/common/base-entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { QuizOption } from 'src/quiz-option/entities/quiz-option.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType({description: 'quizQuestion'})
export class QuizQuestion extends BaseEntity {
  @Column()
  @Field()
  question: string;
  
  @Column()
  @Field()
  quizId: string;

  @Column()
  @Field()
  mark: number;

  @Field(() => [QuizOption])
  @OneToMany(() => QuizOption, (opt) => opt.question, { eager: true })
  options: QuizOption[];

  @Field((type) => Quiz)
  @ManyToOne((type) => Quiz,(quiz) => quiz.questions)
  @JoinColumn({name: "quizId"})
  quiz: Quiz;
}
