import { IsString, IsNumber, IsNotEmpty } from 'class-validator';


export class CreateQuizCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  quizId: string;

  @IsNumber()
  @IsNotEmpty()
  userId: string;  
}
