import { IsString, IsNotEmpty, IsBoolean } from "class-validator"

export class OptionWithBoolean {
  @IsString()
  @IsNotEmpty()
  option: string
  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean
}