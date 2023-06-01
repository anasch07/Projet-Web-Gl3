import { BaseEntity } from 'src/common/base-entity';
import { QuizQuestion } from 'src/quiz-question/entities/quiz-question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuizOption extends BaseEntity {
  @Column()
  display: string;

  @Column()
  questionId: string;

  @ManyToOne(() => QuizQuestion)
  question: QuizQuestion;

  @Column({ default: false })
  isCorrect: boolean;
}
