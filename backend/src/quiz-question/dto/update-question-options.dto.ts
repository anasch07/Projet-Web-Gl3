import { PartialType } from "@nestjs/swagger";
import { CreateQuizQuestionDto } from "./create-quiz-question.dto";
import { OptionWithBoolean } from "./option-with-boolean";
import { ValidateNested } from "class-validator";

class UpdateQuestionOptionsDto  extends PartialType(CreateQuizQuestionDto){
  // update only the list of options
  @ValidateNested()
  options: OptionWithBoolean[]
}