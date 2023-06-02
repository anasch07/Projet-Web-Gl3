import { Injectable } from '@nestjs/common';
import { CreateQuizCommentDto } from './dto/create-quiz-comment.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { QuizComment } from './entities/quiz-comment.entity';
import { Repository } from 'typeorm';
import { UpdateQuizCommentDto } from './dto/update-quiz-comment.dto';

@Injectable()
export class QuizCommentService {
  constructor(
    @InjectRepository(QuizComment)
    private quizCommentRepository: Repository<QuizComment>,
  ) {}


  async create(createQuizCommentDto: CreateQuizCommentDto) {
    return this.quizCommentRepository.save(createQuizCommentDto);
  }

  findAll() {
    return this.quizCommentRepository.find();
  }

  findOne(id: string) {
    return this.quizCommentRepository.findOne({where: {id}});
  }

  update(id: string, updateQuizCommentDto: UpdateQuizCommentDto) {
    return this.quizCommentRepository.update(id, {
      comment: updateQuizCommentDto.comment,
    });
  }

  remove(id: string) {
    return this.quizCommentRepository.delete(id);
  }
}
