import { Injectable } from '@nestjs/common';
import { CreateQuizCommentDto } from './dto/create-quiz-comment.dto';
import { UpdateQuizCommentDto } from './dto/update-quiz-comment.dto';

@Injectable()
export class QuizCommentService {
  create(createQuizCommentDto: CreateQuizCommentDto) {
    return 'This action adds a new quizComment';
  }

  findAll() {
    return `This action returns all quizComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizComment`;
  }

  update(id: number, updateQuizCommentDto: UpdateQuizCommentDto) {
    return `This action updates a #${id} quizComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizComment`;
  }
}
