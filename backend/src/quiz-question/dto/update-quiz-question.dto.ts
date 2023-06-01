import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateQuizQuestionDto } from './create-quiz-question.dto';

export class UpdateQuizQuestionDto extends OmitType(CreateQuizQuestionDto, ["options"]) {
  // update only the question and mark
}
