import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { QuizQuestionController } from './quiz-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { QuizOption } from 'src/quiz-option/entities/quiz-option.entity';

@Module({
  controllers: [QuizQuestionController],
  providers: [QuizQuestionService],
  imports: [
    TypeOrmModule.forFeature(
      [QuizQuestion, QuizOption]
    )
  ]
})
export class QuizQuestionModule {}
