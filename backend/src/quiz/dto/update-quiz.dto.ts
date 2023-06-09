import { IsDateString, IsNotEmpty, IsString, IsUUID, ValidateNested } from '@nestjs/class-validator';
import { UpdateQuizQuestionDtoWithId } from './update-quiz-ques-id.dto';
import { OmitType } from '@nestjs/swagger';
import { CreateQuizDto } from './create-quiz.dto';
import { Type } from '@nestjs/class-transformer';

export class UpdateQuizDto extends OmitType(CreateQuizDto, ["questions"]) {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateQuizQuestionDtoWithId)
  questions: UpdateQuizQuestionDtoWithId[];
}
