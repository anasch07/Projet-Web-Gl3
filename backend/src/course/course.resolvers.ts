import { Args, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import {  } from "@nestjs/common";
import { CourseService } from "./course.service";
import { Course} from "./entities/course.entity";
import { ContentService } from "src/content/content.service";
import { Content } from "src/content/entities/content.entity";
import { ContentByCourseArgs } from "src/content/dto/content-by-course-args";

@Resolver(of => Course)
export class CourseResolver {
  constructor(
    private courseService: CourseService,
    private contentService: ContentService
  ) {}

  @Query((returns) => Course)
  async courseById(@Args('id', { type: () => String }) id: string) {
    return this.courseService.findById(id)
  }
  
  @ResolveField("contents", () => [Content], )
  async contentByCourseId(@Parent() course: Course){
    return this.contentService.findAllByCourseId(course.id,{})
  }
}