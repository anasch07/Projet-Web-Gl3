import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class UpdateQuizCommentDto{
  // only allow to update comment
  @IsString()
  @IsNotEmpty()
  comment: string;
}
