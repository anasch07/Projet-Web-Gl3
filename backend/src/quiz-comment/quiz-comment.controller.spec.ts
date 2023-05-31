import { Test, TestingModule } from '@nestjs/testing';
import { QuizCommentController } from './quiz-comment.controller';
import { QuizCommentService } from './quiz-comment.service';

describe('QuizCommentController', () => {
  let controller: QuizCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizCommentController],
      providers: [QuizCommentService],
    }).compile();

    controller = module.get<QuizCommentController>(QuizCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
