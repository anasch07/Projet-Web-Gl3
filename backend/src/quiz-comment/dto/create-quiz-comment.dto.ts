import { IsString, IsNotEmpty, IsUUID } from '@nestjs/class-validator';


export class CreateQuizCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsUUID()
  @IsNotEmpty()
  quizId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;  
}
