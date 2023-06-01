import { PartialType, OmitType } from '@nestjs/swagger';

import { CreateQuizOptionDto } from './create-quiz-option.dto';

export class UpdateQuizOptionDto extends PartialType(OmitType(CreateQuizOptionDto, ["questionId"])) {
}
