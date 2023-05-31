import { Test, TestingModule } from '@nestjs/testing';
import { QuizCommentService } from './quiz-comment.service';

describe('QuizCommentService', () => {
  let service: QuizCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizCommentService],
    }).compile();

    service = module.get<QuizCommentService>(QuizCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
