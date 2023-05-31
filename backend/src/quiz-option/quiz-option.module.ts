import { Module } from '@nestjs/common';
import { QuizOptionService } from './quiz-option.service';
import { QuizOptionController } from './quiz-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizOption } from './entities/quiz-option.entity';

@Module({
  controllers: [QuizOptionController],
  providers: [QuizOptionService],
  imports: [
    TypeOrmModule.forFeature(
      [QuizOption]
    )
  ],
  exports: [
    QuizOptionService
  ]
})
export class QuizOptionModule {}
