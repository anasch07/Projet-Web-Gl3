import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateQuizQuestionDto } from 'src/quiz-question/dto/create-quiz-question.dto';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  scheduleDate: Date;

  @IsNotEmpty()
  @IsDateString()
  deadlineDate: Date;

  @IsNotEmpty()
  questions: CreateQuizQuestionDto[];

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  chapterId: string;
}
