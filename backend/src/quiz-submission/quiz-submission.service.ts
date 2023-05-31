import { Injectable } from '@nestjs/common';
import { CreateQuizSubmissionDto } from './dto/create-quiz-submission.dto';
import { UpdateQuizSubmissionDto } from './dto/update-quiz-submission.dto';

@Injectable()
export class QuizSubmissionService {
  create(createQuizSubmissionDto: CreateQuizSubmissionDto) {
    return 'This action adds a new quizSubmission';
  }

  findAll() {
    return `This action returns all quizSubmission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizSubmission`;
  }

  update(id: number, updateQuizSubmissionDto: UpdateQuizSubmissionDto) {
    return `This action updates a #${id} quizSubmission`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizSubmission`;
  }
}
