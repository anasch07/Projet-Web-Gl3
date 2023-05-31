import { IsNotEmpty } from 'class-validator';
import { CreateQuizQuestionDto } from 'src/quiz-question/dto/create-quiz-question.dto';

export class CreateQuizDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  scheduleDate: Date;
  @IsNotEmpty()
  deadlineDate: Date;
  @IsNotEmpty()
  questions: CreateQuizQuestionDto[];

  chapterId: string;
}
