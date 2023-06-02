import { Args, Resolver, Query } from "@nestjs/graphql";
import {  } from "@nestjs/common";
import { QuizSubmissionService } from "./quiz-submission.service";
import { QuizSubmission} from "./entities/quiz-submission.entity";

@Resolver(of => QuizSubmission)
export class QuizSubmissionResolver {
  constructor(
    private quizSubmissionService: QuizSubmissionService
  ) {}

  @Query((returns) => QuizSubmission)
  async quizSubmissionById(@Args('id', { type: () => String }) id: string) {
    return this.quizSubmissionService.findOne(id)
  }
  
}