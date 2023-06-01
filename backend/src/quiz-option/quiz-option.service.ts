import { Injectable, NotFoundException } from '@nestjs/common';
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
    const opt = this.quizOptionRepository.findOne(id);
    if(!opt){
      throw new NotFoundException("question not found")
    }
    return opt;
  }

  update(id: string, updateQuizOptionDto: UpdateQuizOptionDto, manager?: EntityManager) {
    return manager?.update(QuizOption, id, updateQuizOptionDto) || this.quizOptionRepository.update(id, updateQuizOptionDto);
  }

  remove(id: string, manager?: EntityManager) {
    return manager?.delete(QuizOption, id) || this.quizOptionRepository.delete(id);
  }
}
