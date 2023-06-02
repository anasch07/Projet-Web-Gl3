import { Args, Resolver, Query } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import {  } from "@nestjs/common";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService
  ) {}

  @Query((returns) => User)
  async userById(@Args('id', { type: () => String }) id: string) {
    return this.userService.findById(id)
  }

  @Query((returns) => User)
  async userByUsername(@Args('username', { type: () => String }) username: string) {
    return this.userService.findByUsername(username)
  }
}