import { Injectable } from '@nestjs/common';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { EntityManager, Repository } from 'typeorm';
import { QuizOption } from 'src/quiz-option/entities/quiz-option.entity';



@Injectable()
export class QuizQuestionService {
  constructor(
    @InjectRepository(QuizQuestion)
    private quizQuestionRepository: Repository<QuizQuestion>,
    @InjectRepository(QuizOption)
    private quizOptionRepository: Repository<QuizOption>
  ) {}

  async create(createQuizQuestionDto: CreateQuizQuestionDto, quizId: string, entityManager?: EntityManager) {
    //---- create a new question
    const { question, mark, options } = createQuizQuestionDto;
    if(options?.length < 1) throw new Error('A question must have at least one option');

    const newQuestion = new QuizQuestion();
    newQuestion.question = question;
    newQuestion.mark = mark || 1;
    newQuestion.correctOption = null;
    newQuestion.wrongOptions = [];

    //---- save the question
    const savedQuestion = await entityManager?.save({...newQuestion, quizId}) 
                          || await this.quizQuestionRepository.save({...newQuestion, quizId});


    //---- create wrong options
    const wrongOptions = options.filter((opt) => !opt.isCorrect);

    const wrongOptionsPromises = wrongOptions.map((opt) => {
      const newOption = new QuizOption();
      newOption.display = opt.option;
      newOption.question = savedQuestion;
      //TODO: save the option using its service
      return entityManager?.save(newOption) || this.quizOptionRepository.save(newOption);
    });

    const wrongOptionsResult = await Promise.all(wrongOptionsPromises);

    //---- create correct option
    const correctOption = options.find((opt) => opt.isCorrect);

    if(!correctOption) throw new Error('A question must have a correct option');

    const newOption = new QuizOption();
    newOption.display = correctOption.option;
    newOption.question = savedQuestion;
    
    //TODO: save the option using its service
    const correctOptionResult = await entityManager?.save(newOption) 
                            || await this.quizOptionRepository.save(newOption);

    //---- update the question with correct option

    savedQuestion.correctOption = correctOptionResult;
    savedQuestion.wrongOptions = wrongOptionsResult;

    return entityManager?.save(savedQuestion) || this.quizQuestionRepository.save(savedQuestion);
  }

  findByQuizID(quizId: string) {
    return this.quizQuestionRepository.find({where: {quizId}, relations: ['correctOption', 'wrongOptions']});
  }


  update(id: string, updateQuizQuestionDto: UpdateQuizQuestionDto) {
    return this.quizQuestionRepository.update(id, updateQuizQuestionDto);
  }


  remove(id: string) {
    return this.quizQuestionRepository.delete(id);
  }
}
