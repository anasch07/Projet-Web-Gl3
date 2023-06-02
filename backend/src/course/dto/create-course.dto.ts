import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}