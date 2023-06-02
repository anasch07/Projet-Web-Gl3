import { IsNotEmpty, IsNumber, IsString, ValidateNested } from '@nestjs/class-validator';

import { OptionWithBoolean } from './option-with-boolean';
import { Type } from '@nestjs/class-transformer';

export class CreateQuizQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsNumber()
  mark: number;

  // a list of options and each with a boolean value to indicate if it is correct
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OptionWithBoolean)
  options: OptionWithBoolean[];
}
