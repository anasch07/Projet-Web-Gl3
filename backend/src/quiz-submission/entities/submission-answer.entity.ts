import { QuizOption } from "src/quiz-option/entities/quiz-option.entity";
import { QuizQuestion } from "src/quiz-question/entities/quiz-question.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { QuizSubmission } from "./quiz-submission.entity";
//submission wa7da 
@Entity()
@Index(["question", "answer", "submission"], { unique: true })
export class UserAnswers {
  @ManyToOne(() => QuizQuestion, { nullable: false, primary: true})
  @JoinColumn({name: "questionId",})
  question: QuizQuestion;
  
  @ManyToOne(() => QuizOption, { nullable: false, primary: true})
  @JoinColumn({name: "answerId",})
  answer: QuizOption;

  @ManyToOne(() => QuizSubmission, { nullable: false, primary: true})
  @JoinColumn({name: "submissionId",})
  submission: QuizSubmission;
}
