import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { CreateQuizOptionDto } from './dto/create-quiz-option.dto';
import { UpdateQuizOptionDto } from './dto/update-quiz-option.dto';
import { QuizOption } from './entities/quiz-option.entity';

@Injectable()
export class QuizOptionService {
  constructor(
    @InjectRepository(QuizOption)
    private quizOptionRepository: Repository<QuizOption>,
  ) {}

  create(
    createQuizOptionDto: CreateQuizOptionDto,
    entityManager?: EntityManager,
  ) {
    return (
      entityManager?.save(QuizOption, createQuizOptionDto) ||
      this.quizOptionRepository.save(createQuizOptionDto)
    );
  }

  findOne(id: string) {
    return this.quizOptionRepository.findOne(id);
  }

  update(id: string, updateQuizOptionDto: UpdateQuizOptionDto) {
    return this.quizOptionRepository.update(id, updateQuizOptionDto);
  }

  remove(id: string) {
    return this.quizOptionRepository.delete(id);
  }
}
