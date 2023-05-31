import { Module } from '@nestjs/common';
import { QuizSubmissionService } from './quiz-submission.service';
import { QuizSubmissionController } from './quiz-submission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizSubmission } from './entities/quiz-submission.entity';
import { UserAnswers } from './entities/submission-answer.entity';

@Module({
  controllers: [QuizSubmissionController],
  providers: [QuizSubmissionService],
  imports: [
    TypeOrmModule.forFeature(
      [QuizSubmission, UserAnswers]
    )
  ]
})
export class QuizSubmissionModule {}
