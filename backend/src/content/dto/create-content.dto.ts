import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateContentDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  }