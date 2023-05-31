import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizOptionService } from 'src/quiz-option/quiz-option.service';
import { QuizQuestionService } from 'src/quiz-question/quiz-question.service';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { QuizService } from 'src/quiz/quiz.service';
import { Repository } from 'typeorm';
import { CreateQuizSubmissionDto } from './dto/create-quiz-submission.dto';
import { UpdateQuizSubmissionDto } from './dto/update-quiz-submission.dto';
import { QuizSubmission } from './entities/quiz-submission.entity';
import { UserAnswers } from './entities/submission-answer.entity';
@Injectable()
export class QuizSubmissionService {
  constructor(
  private quizService:QuizService,
  private quizOptionService:QuizOptionService ,
  private quizQuestionService:QuizQuestionService,
  @InjectRepository(QuizSubmissionService)
    private submissionRepo: Repository<QuizSubmission>,
  @InjectRepository(UserAnswers)
    private UserAnswerRepo: Repository<UserAnswers>
  ) {}

  create(createQuizSubmissionDto: CreateQuizSubmissionDto) {
    return 'This action adds a new quizSubmission';
  }
 
  async createQuizResponse(CreateQuizSubmissionDto: CreateQuizSubmissionDto) {
    const { idQuizz, fr } = CreateQuizSubmissionDto;
    const quizSubmission= new QuizSubmission()
    const quiz=await this.quizService.findOne(idQuizz);
    quizSubmission.quiz=quiz
    //sub Save
    await this.submissionRepo.save(this.submissionRepo.create(quizSubmission));
    Object.entries(fr).forEach(async ([questionId, optionId]) => {
      const userAnswer = new UserAnswers();
      const quest=await this.quizQuestionService.findOne(questionId)
      const option=await this.quizOptionService.findOne(optionId)
      userAnswer.submission=quizSubmission
      userAnswer.question=quest
      userAnswer.answer=option

      if(userAnswer.question.correctOption==userAnswer.answer){
        quizSubmission.mark++       
      }
      await this.UserAnswerRepo.save(this.UserAnswerRepo.create(userAnswer))
     });
    return quizSubmission;
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
