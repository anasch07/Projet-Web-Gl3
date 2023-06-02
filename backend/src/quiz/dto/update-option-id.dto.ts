import { IsBoolean, IsOptional, IsUUID } from "class-validator";
import { CreateQuizOptionDto } from "src/quiz-option/dto/create-quiz-option.dto";

export class OptionWithBooleanWithId extends CreateQuizOptionDto{
  @IsUUID()
  @IsOptional()
  id: string;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean
}