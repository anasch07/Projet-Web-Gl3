import { Args, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import {  } from "@nestjs/common";
import { UserService } from "./user.service";
import { QuizSubmission } from "src/quiz-submission/entities/quiz-submission.entity";
import { QuizSubmissionService } from "src/quiz-submission/quiz-submission.service";

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private submissionService: QuizSubmissionService
  ) {}

  @Query((returns) => User)
  async userById(@Args('id', { type: () => String }) id: string) {
    return this.userService.findById(id)
  }

  @Query((returns) => User)
  async userByUsername(@Args('username', { type: () => String }) username: string) {
    return this.userService.findByUsername(username)
  }

  @ResolveField("submissions", () => [QuizSubmission], )
  async userSubmissions(@Parent() user: User){
    return this.submissionService.findUserSubmissions(user.id)
  }
}