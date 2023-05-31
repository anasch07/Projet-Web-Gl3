import { Injectable } from '@nestjs/common';
import { CreateQuizOptionDto } from './dto/create-quiz-option.dto';
import { UpdateQuizOptionDto } from './dto/update-quiz-option.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizOption } from './entities/quiz-option.entity';
import { QuizQuestion } from 'src/quiz-question/entities/quiz-question.entity';

@Injectable()
export class QuizOptionService {
  constructor(
    @InjectRepository(QuizOption)
    private quizOptionRepository: Repository<QuizOption>
  ) { }

  create(createQuizOptionDto: CreateQuizOptionDto, entityManager?: EntityManager) {
    return entityManager?.save(QuizOption, createQuizOptionDto) || this.quizOptionRepository.save(createQuizOptionDto);
  }

  findOne(id: string) {
    const query = this.quizOptionRepository.createQueryBuilder("quizoption")
      .leftJoinAndSelect(QuizQuestion, "QuizQuestion", "quizoption.questionId = QuizQuestion.id")

    return query.getOne() // this.quizOptionRepository.findOne(id);
  }

  update(id: string, updateQuizOptionDto: UpdateQuizOptionDto) {
    return this.quizOptionRepository.update(id, updateQuizOptionDto);
  }

  remove(id: string) {
    return this.quizOptionRepository.delete(id);
  }
}
