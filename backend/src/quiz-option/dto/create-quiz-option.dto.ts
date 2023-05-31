import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizOptionDto {
  @IsNotEmpty()
  @IsString()
  display: string;

  @IsNotEmpty()
  @IsString()
  questionId: string;

  @IsBoolean()
  isCorrect: boolean;
}
