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

@Entity()
export class QuizQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  mark: number;

  @OneToMany(() => QuizOption, (opt) => opt.question, { eager: true })
  options: QuizOption[];

  @ManyToOne(() => Quiz)
  quiz: Quiz;
}
