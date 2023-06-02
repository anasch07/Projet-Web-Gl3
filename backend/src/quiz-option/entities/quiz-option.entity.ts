import { BaseEntity } from 'src/common/base-entity';
import { QuizQuestion } from 'src/quiz-question/entities/quiz-question.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class QuizOption extends BaseEntity {
  @Column()
  display: string;

  @Column()
  questionId: string;
  
  @ManyToOne(() => QuizQuestion, (ques) => ques.options,{onDelete:'CASCADE'})
  @JoinColumn({name: "questionId"})
  question: QuizQuestion;

  @Column({ default: false })
  isCorrect: boolean;
}
