import { PartialType } from '@nestjs/swagger';
import { CreateQuizQuestionDto } from './create-quiz-question.dto';

export class UpdateQuizQuestionDto extends PartialType(CreateQuizQuestionDto) {
  // update only the question and mark
  question: string
  mark: number
}
