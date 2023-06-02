import { Args, Resolver, Query } from "@nestjs/graphql";
import {  } from "@nestjs/common";
import { ContentService } from "./content.service";
import { Content} from "./entities/content.entity";
import { ContentByCourseArgs } from "./dto/content-by-course-args";

@Resolver(of => Content)
export class ContentResolver {
  constructor(
    private contentService: ContentService
  ) {}

  @Query((returns) => Content)
  async contentById(@Args('id', { type: () => String }) id: string) {
    return this.contentService.findById(id)
  }
  @Query((returns) => [Content])
  async contentByCourseId(@Args() args: ContentByCourseArgs) {
    return this.contentService.findAllByCourseId(args.id,{description:args.description,name:args.name})
  }
  
}