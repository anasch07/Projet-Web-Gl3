import { PartialType } from "@nestjs/swagger";
import { CreateQuizQuestionDto } from "./create-quiz-question.dto";
import { OptionWithBoolean } from "./option-with-boolean";
import { ValidateNested } from "@nestjs/class-validator";
import { Type } from "@nestjs/class-transformer";

class UpdateQuestionOptionsDto  extends PartialType(CreateQuizQuestionDto){
  // update only the list of options
  @ValidateNested()
  @Type(() => OptionWithBoolean)
  options: OptionWithBoolean[]
}