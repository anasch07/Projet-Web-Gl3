import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from 'src/content/content.module';
import { QuizOptionModule } from 'src/quiz-option/quiz-option.module';
import { QuizQuestionModule } from 'src/quiz-question/quiz-question.module';

import { Quiz } from './entities/quiz.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [
    TypeOrmModule.forFeature([Quiz]),
    QuizQuestionModule,
    ContentModule,
    QuizOptionModule,
  ],
  exports: [QuizService],
})
export class QuizModule {}
