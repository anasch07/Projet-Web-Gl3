import { IsNotEmpty, IsString } from "class-validator";

export class CreateContentDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  }