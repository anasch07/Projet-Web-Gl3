import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { CreateQuizOptionDto } from 'src/quiz-option/dto/create-quiz-option.dto';
import { QuizOption } from 'src/quiz-option/entities/quiz-option.entity';
import { QuizOptionService } from 'src/quiz-option/quiz-option.service';
import { EntityManager, Repository } from 'typeorm';

import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { QuizQuestion } from './entities/quiz-question.entity';

@Injectable()
export class QuizQuestionService {
  constructor(
    @InjectRepository(QuizQuestion)
    private quizQuestionRepository: Repository<QuizQuestion>,
    @Inject(QuizOptionService)
    private quizOptionService: QuizOptionService,
  ) {}

  async create(
    createQuizQuestionDto: CreateQuizQuestionDto,
    quiz: Quiz,
    entityManager?: EntityManager,
  ) {
    //---- create a new question
    const { question, mark, options } = createQuizQuestionDto;
    if (options?.length < 1)
      throw new Error('A question must have at least one option');

    const newQuestion = new QuizQuestion();
    newQuestion.question = question;
    newQuestion.mark = mark || 1;
    newQuestion.options = [];

    newQuestion.quiz = quiz;

    //---- save the question
    const savedQuestion =
      (await entityManager?.save(newQuestion)) ||
      (await this.quizQuestionRepository.save(newQuestion));

    //---- create wrong options

    const optionsPromises = options.map((opt) => {
      const newOption = new CreateQuizOptionDto();
      newOption.display = opt.option;
      newOption.isCorrect = opt.isCorrect;
      newOption.questionId = savedQuestion.id;
      //TODO: save the option using its service
      return this.quizOptionService.create(newOption, entityManager);
    });

    const optionsResult = await Promise.all(optionsPromises);

    //---- update the question with correct option

    savedQuestion.options = optionsResult;

    return (
      entityManager?.save(QuizQuestion, savedQuestion) ||
      this.quizQuestionRepository.save(savedQuestion)
    );
  }

  findByQuizID(quizId: string) {
    return this.quizQuestionRepository.find({
      where: { quizId },
      relations: ['correctOption', 'wrongOptions'],
    });
  }

  async findOne(id:string){
    const question = await this.quizQuestionRepository.findOne(id);
    if (!question) {
      throw new NotFoundException("question not found")
    }
    return question;
  }

  update(id: string, updateQuizQuestionDto: UpdateQuizQuestionDto) {
    return this.quizQuestionRepository.update(id, updateQuizQuestionDto);
  }

  remove(id: string) {
    return this.quizQuestionRepository.delete(id);
  }
}
