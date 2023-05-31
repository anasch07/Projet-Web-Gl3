import { Module } from '@nestjs/common';
import { QuizCommentService } from './quiz-comment.service';
import { QuizCommentController } from './quiz-comment.controller';
import { QuizComment } from './entities/quiz-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [QuizCommentController],
  providers: [QuizCommentService],
  imports: [
    TypeOrmModule.forFeature(
      [QuizComment]
    )
  ]
})
export class QuizCommentModule {}
