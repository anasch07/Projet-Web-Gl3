import { Quiz } from 'src/quiz/entities/quiz.entity';
import { QuizOption } from 'src/quiz-option/entities/quiz-option.entity';
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
import { BaseEntity } from 'src/common/base-entity';

@Entity()
export class QuizQuestion extends BaseEntity {
  @Column()
  question: string;

  @Column()
  mark: number;

  @OneToMany(() => QuizOption, (opt) => opt.question, { eager: true })
  options: QuizOption[];

  @Column()
  quizId: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
