import { PartialType } from '@nestjs/swagger';
import { CreateQuizCommentDto } from './create-quiz-comment.dto';

export class UpdateQuizCommentDto extends PartialType(CreateQuizCommentDto) {}
