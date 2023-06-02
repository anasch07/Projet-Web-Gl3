import { QuizOption } from "src/quiz-option/entities/quiz-option.entity";
import { QuizQuestion } from "src/quiz-question/entities/quiz-question.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { QuizSubmission } from "./quiz-submission.entity";
//submission wa7da 
@Entity()
@Index(["question", "answer", "submission"], { unique: true })
export class UserAnswers {
  @Column()
  @PrimaryColumn()
  questionId: string;
  @Column()
  @PrimaryColumn()
  answerId: string;
  @Column()
  @PrimaryColumn()
  submissionId: string;

  @ManyToOne(() => QuizQuestion, {nullable: false})
  @JoinColumn({name: "questionId",})
  question: QuizQuestion;
  
  @ManyToOne(() => QuizOption, { nullable: false})
  @JoinColumn({name: "answerId",})
  answer: QuizOption;

  @ManyToOne(() => QuizSubmission, { nullable: false})
  @JoinColumn({name: "submissionId",})
  submission: QuizSubmission;
}
