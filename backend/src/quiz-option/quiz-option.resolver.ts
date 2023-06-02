import { Args, Resolver, Query } from "@nestjs/graphql";
import {  } from "@nestjs/common";
import { QuizOptionService } from "./quiz-option.service";
import { QuizOption } from "./entities/quiz-option.entity";

@Resolver(of => QuizOption)
export class QuizOptionResolver {
  constructor(
    private quizOptionService: QuizOptionService
  ) {}

  @Query((returns) => QuizOption)
  async quizOptionById(@Args('id', { type: () => String }) id: string) {
    return this.quizOptionService.findOne(id)
  }
  
}