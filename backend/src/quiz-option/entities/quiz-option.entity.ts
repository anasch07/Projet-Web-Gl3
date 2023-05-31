import { QuizQuestion } from 'src/quiz-question/entities/quiz-question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuizOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  display: string;

  @ManyToOne(() => QuizQuestion)
  question: QuizQuestion;

  @Column({ default: false })
  isCorrect: boolean;
}
