import { Args, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import {  } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { Quiz} from "./entities/quiz.entity";
import { QuizQuestionService } from "src/quiz-question/quiz-question.service";
import { QuizQuestion } from "src/quiz-question/entities/quiz-question.entity";
import { QuizSubmission } from "src/quiz-submission/entities/quiz-submission.entity";
import { QuizSubmissionService } from "src/quiz-submission/quiz-submission.service";

@Resolver(of => Quiz)
export class QuizResolver {
  constructor(
    private quizService: QuizService,
    private questionService:QuizQuestionService,
    //private submissionService: QuizSubmissionService
  ) {}

  @Query((returns) => Quiz)
  async quizById(@Args('id', { type: () => String }) id: string) {
    return this.quizService.findOneGQL(id)
  }

  @Query((returns)=>[Quiz])
  async allQuizzes(){
   return this.quizService.findAll()
 }



  @ResolveField("questions", () => [QuizQuestion] )
  async quizQuestions(@Parent() quiz: Quiz){
    return this.questionService.findByQuizIDGQL(quiz.id)
  }


  
  //@ResolveField("submissions", () => [QuizSubmission], )
  // async userSubmissions(@Parent() quiz: Quiz){
  //   return this.submissionService.
  //}
}