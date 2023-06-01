import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateQuizQuestionDto } from 'src/quiz-question/dto/create-quiz-question.dto';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  scheduleDate: Date;

  @IsNotEmpty()
  @IsDate()
  deadlineDate: Date;

  @IsNotEmpty()
  questions: CreateQuizQuestionDto[];

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  chapterId: string;
}
