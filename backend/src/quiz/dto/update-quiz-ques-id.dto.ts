import { PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsUUID, ValidateNested, IsOptional } from "class-validator";
import { UpdateQuizQuestionDto } from "src/quiz-question/dto/update-quiz-question.dto";
import { OptionWithBooleanWithId } from "./update-option-id.dto";
import { Type } from "class-transformer";

export class UpdateQuizQuestionDtoWithId extends UpdateQuizQuestionDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => OptionWithBooleanWithId)
  options: OptionWithBooleanWithId[]
}