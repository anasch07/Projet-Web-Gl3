import { QuizQuestion } from "src/quiz-question/entities/quiz-question.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuizOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  display: string;

  @Column()
  questionId: string;

  @ManyToOne(() => QuizQuestion)
  @JoinColumn({name: "questionId"})
  question: QuizQuestion
}
