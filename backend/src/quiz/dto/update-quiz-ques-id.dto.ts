import { PartialType } from "@nestjs/swagger";
import { IsBoolean, IsUUID } from "class-validator";
import { UpdateQuizQuestionDto } from "src/quiz-question/dto/update-quiz-question.dto";
import { OptionWithBooleanWithId } from "./update-option-id.dto";

export class UpdateQuizQuestionDtoWithId extends UpdateQuizQuestionDto {
  @IsUUID()
  id?: string;

  @IsBoolean()
  isDeleted?: boolean

  options?: OptionWithBooleanWithId[]
}