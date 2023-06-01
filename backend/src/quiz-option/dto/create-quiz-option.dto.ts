import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateQuizOptionDto {
  @IsNotEmpty()
  @IsString()
  display: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  questionId: string;

  @IsBoolean()
  isCorrect: boolean;
}
