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
  @InjectRepository(QuizSubmission)
    private submissionRepo: Repository<QuizSubmission>,
  @InjectRepository(UserAnswers)
    private UserAnswerRepo: Repository<UserAnswers>
  ) {}
 
  async create(CreateQuizSubmissionDto: CreateQuizSubmissionDto) {
    const { idQuizz, fr } = CreateQuizSubmissionDto;
    const quizSubmission= new QuizSubmission()
    const quiz=await this.quizService.findOne(idQuizz);
    quizSubmission.quiz=quiz
    quizSubmission.creationDate = new Date()
    quizSubmission.mark = 0
    //sub Save
    const submission = await this.submissionRepo.save(this.submissionRepo.create(quizSubmission));

    const entries = Object.entries(fr)
    for(let idx=0; idx<entries.length; idx++) {
      const [questionId, optionId] = entries[idx]
      const quest = await this.quizQuestionService.findOne(questionId)
      const option = await this.quizOptionService.findOne(optionId)

      const userAnswer = new UserAnswers();
      userAnswer.submission=submission
      userAnswer.question=quest
      userAnswer.answer=option
      if(option.isCorrect){
        submission.mark++
      }
      await this.UserAnswerRepo.save(this.UserAnswerRepo.create(userAnswer))
    }
    
    await this.submissionRepo.save(this.submissionRepo.create(submission));
    return submission;
  }

  findUserSubmissions(userId: string) {
    return this.submissionRepo.find({where: {studentId: userId}})
  }

  findAll() {
    return `This action returns all quizSubmission`;
  }

  findOne(id:string) {
    return `This action returns a #${id} quizSubmission`;
  }

  update(id: number, updateQuizSubmissionDto: UpdateQuizSubmissionDto) {
    return `This action updates a #${id} quizSubmission`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizSubmission`;
  }
}
