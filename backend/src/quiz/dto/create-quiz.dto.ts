import { CreateQuizQuestionDto } from "src/quiz-question/dto/create-quiz-question.dto";

export class CreateQuizDto {
  title: string;
  description: string;
  scheduleDate: Date;
  deadlineDate: Date;

  questions: CreateQuizQuestionDto[];

  chapterId: string;
}
