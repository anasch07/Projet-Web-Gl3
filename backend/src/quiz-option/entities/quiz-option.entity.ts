import { BaseEntity } from 'src/common/base-entity';
import { QuizQuestion } from 'src/quiz-question/entities/quiz-question.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuizOption extends BaseEntity {
  @Column()
  display: string;

  @Column()
  questionId: string;
//,{onDelete:'CASCADE'}
  @ManyToOne(() => QuizQuestion, (ques) => ques.options,{onDelete:'CASCADE'})
  question: QuizQuestion;

  @Column({ default: false })
  isCorrect: boolean;
}
