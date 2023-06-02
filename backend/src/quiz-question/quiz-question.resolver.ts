import { Args, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import {  } from "@nestjs/common";
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { QuizQuestionService } from "./quiz-question.service";
import { QuizQuestion } from "./entities/quiz-question.entity";
import { QuizOption } from "src/quiz-option/entities/quiz-option.entity";
import { QuizOptionService } from "src/quiz-option/quiz-option.service";

@Resolver(of => QuizQuestion)
export class QuizQuestionResolver {
  constructor(
    private quizQuestionService: QuizQuestionService,
    private optionService:QuizOptionService
    
  ) {}

  @Query((returns) => QuizQuestion)
  async quizQuestionById(@Args('id', { type: () => String }) id: string) {
    return this.quizQuestionService.findOne(id)
  }

  @Query((returns) => [QuizQuestion])
  async quizQuestionByQuizId(@Args('id', { type: () => String }) id: string) {
    return this.quizQuestionService.findByQuizIDGQL(id)
  }
  
  @ResolveField("options", () => [QuizOption], )
  async quizQuestions(@Parent() question: QuizQuestion){
    return this.optionService.findByQuestionId(question.id)
  }
}