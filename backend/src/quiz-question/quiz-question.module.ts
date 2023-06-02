import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { QuizQuestionController } from './quiz-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { QuizOptionModule } from 'src/quiz-option/quiz-option.module';
import { ContentModule } from 'src/content/content.module';
import { QuizQuestionResolver } from './quiz-question.resolver';

@Module({
  controllers: [QuizQuestionController],
  providers: [QuizQuestionService, QuizQuestionResolver],
  imports: [
    QuizOptionModule,
    TypeOrmModule.forFeature(
      [QuizQuestion]
    ),
  ],
  exports: [
    QuizQuestionService
  ]
})
export class QuizQuestionModule {}
