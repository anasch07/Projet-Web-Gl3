import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentService } from 'src/content/content.service';
import { QuizQuestionService } from 'src/quiz-question/quiz-question.service';
import { EntityManager, Repository } from 'typeorm';
import { getConnection } from 'typeorm';

import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { QuizOptionService } from 'src/quiz-option/quiz-option.service';

@Injectable()
export class QuizService {
  constructor(
    private questionService: QuizQuestionService,
    private contentService: ContentService,
    private quizOptionService: QuizOptionService,
    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    const newQuiz = new Quiz();
    newQuiz.title = createQuizDto.title;
    newQuiz.description = createQuizDto.description;
    newQuiz.scheduleDate = createQuizDto.scheduleDate;
    newQuiz.deadlineDate = createQuizDto.deadlineDate;

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const chapter = await this.contentService.findById(createQuizDto.chapterId);
    if (!chapter) throw new NotFoundException('invalid chapter id');
    newQuiz.chaptre = chapter;
    const quiz = await queryRunner.manager.save(newQuiz);

    await Promise.all(
      createQuizDto.questions.map(async (question) => {
        return await this.questionService.create(
          question,
          quiz,
          queryRunner.manager,
        );
      }),
    );

    await queryRunner.commitTransaction();
    await queryRunner.release();
    return quiz;
  }

  findAll() {
    //find all quiz with questions and options and chapters and their courses
    return this.quizRepo.find({
      relations: [
        'questions',
        'chaptre',
        'questions.options',
        'chaptre.course',
      ],
    });
  }

  async findOne(id: string, entityManager?: EntityManager) {
    let quiz;
    if(entityManager){
      quiz = await entityManager.findOne(Quiz, id, {
        relations: [
          'questions',
          'chaptre',
          'questions.options',
          'questions.options.question',
        ],
      });
    }
    else{
      quiz = await this.quizRepo.findOne(id, {
        relations: [
          'questions',
          'chaptre',
          'questions.options',
          'questions.options.question',
        ],
      });
    }
    if (!quiz) {
      throw new NotFoundException('Quiz id not found');
    }
    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const {questions, ...quizInfo} = updateQuizDto

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const quiz = await this.findOne(id, queryRunner.manager);

    const retVal = await queryRunner.manager.save(
      this.quizRepo.create({ id: quiz.id, ...quizInfo }),
    );
    
    for(let idx=0; idx < questions.length; idx++){
      const { options, ...question } = questions[idx]
      if(question.isDeleted){
        await this.questionService.remove(question.id, queryRunner.manager)
        continue;
      }
      if(!question.id){
        // Create
        const optToCreate = options.map(e => ({...e, option: e.display}))
        await this.questionService.create({question: question.question, mark: 5, options: optToCreate}, quiz, queryRunner.manager)
        continue
      }
      
      await this.questionService.update(question.id, {...question}, queryRunner.manager)
      for(const option of options){
        if(option.isDeleted){
          await this.quizOptionService.remove(question.id, queryRunner.manager)
          continue;
        }
        if(option.id){
          await this.quizOptionService.update(option.id, {...option}, queryRunner.manager)
          continue
        }
        await this.quizOptionService.create({...option}, queryRunner.manager)
      }
    }

    queryRunner.commitTransaction()
    queryRunner.release()
    return retVal
  }

  async delete(id: string): Promise<string> {
    const quiz = await this.findOne(id);
    const quiz1=await this.quizRepo.findOne(id)
  const list =quiz1.questions
  for(let idx=0; idx<list.length; idx++){
    await this.questionService.remove(list[idx].id)
  }
    //console.log(quiz)
    await this.quizRepo.remove(quiz1);
    return id;
  }

  async count(): Promise<number> {
    return await this.quizRepo.count();
  }
}
