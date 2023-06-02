import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class ContentByCourseArgs {
  @Field((type) => String)
  id: string;
  
  
  @Field()
  name?: string;

  @Field()
  description?: string;
}