import { Module } from '@nestjs/common';
import { QuizSubmissionService } from './quiz-submission.service';
import { QuizSubmissionController } from './quiz-submission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizSubmission } from './entities/quiz-submission.entity';
import { UserAnswers } from './entities/submission-answer.entity';
import { QuizModule } from 'src/quiz/quiz.module';
import { QuizQuestionService } from 'src/quiz-question/quiz-question.service';
import { QuizOptionService } from 'src/quiz-option/quiz-option.service';
import { QuizOptionModule } from 'src/quiz-option/quiz-option.module';
import { QuizQuestionModule } from 'src/quiz-question/quiz-question.module';

@Module({
  controllers: [QuizSubmissionController],
  providers: [QuizSubmissionService],
  imports: [
    TypeOrmModule.forFeature(
      [QuizSubmission, UserAnswers]
    ),
    QuizModule,
    QuizQuestionModule,
    QuizOptionModule
  ],
  exports: [
    QuizSubmissionService
  ]
})
export class QuizSubmissionModule {}
