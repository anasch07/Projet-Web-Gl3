import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizQuestionModule } from 'src/quiz-question/quiz-question.module';
import { ContentModule } from 'src/content/content.module';
import { QuizOptionModule } from 'src/quiz-option/quiz-option.module';

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [
    TypeOrmModule.forFeature(
      [Quiz]
    ),
    QuizQuestionModule,
    ContentModule,
    QuizOptionModule,
  ],
  exports: [
    QuizService
  ]
})
export class QuizModule {}
