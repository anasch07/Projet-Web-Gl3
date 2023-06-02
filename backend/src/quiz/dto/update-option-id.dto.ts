import { IsBoolean, IsOptional, IsUUID } from "@nestjs/class-validator";
import { OmitType } from "@nestjs/swagger";
import { CreateQuizOptionDto } from "src/quiz-option/dto/create-quiz-option.dto";

export class OptionWithBooleanWithId extends OmitType(CreateQuizOptionDto, ['questionId']){
  @IsUUID()
  @IsOptional()
  id: string;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean
}