import { IsBoolean, IsUUID } from "class-validator";
import { CreateQuizOptionDto } from "src/quiz-option/dto/create-quiz-option.dto";

export class OptionWithBooleanWithId extends CreateQuizOptionDto{
  @IsUUID()
  id?: string;

  @IsBoolean()
  isDeleted?: boolean
}