import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { QuizQuestionController } from './quiz-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { QuizOption } from 'src/quiz-option/entities/quiz-option.entity';
import { QuizOptionModule } from 'src/quiz-option/quiz-option.module';
import { ContentModule } from 'src/content/content.module';

@Module({
  controllers: [QuizQuestionController],
  providers: [QuizQuestionService],
  imports: [
    TypeOrmModule.forFeature(
      [QuizQuestion, QuizOption]
    ),
    QuizOptionModule,
    ContentModule
  ],
  exports: [
    QuizQuestionService
  ]
})
export class QuizQuestionModule {}
