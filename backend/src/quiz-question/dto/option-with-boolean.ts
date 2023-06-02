import { IsString, IsNotEmpty, IsBoolean } from "@nestjs/class-validator"

export class OptionWithBoolean {
  @IsString()
  @IsNotEmpty()
  option: string
  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean
}