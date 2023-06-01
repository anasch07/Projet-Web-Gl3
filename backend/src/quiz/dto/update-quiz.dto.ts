import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UpdateQuizQuestionDtoWithId } from './update-quiz-ques-id.dto';
import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateQuizDto } from './create-quiz.dto';

export class UpdateQuizDto extends OmitType(CreateQuizDto, ["questions"]) {
  @IsNotEmpty()
  questions: UpdateQuizQuestionDtoWithId[];
}
