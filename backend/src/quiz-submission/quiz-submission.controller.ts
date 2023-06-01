import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizSubmissionService } from './quiz-submission.service';
import { CreateQuizSubmissionDto } from './dto/create-quiz-submission.dto';
import { UpdateQuizSubmissionDto } from './dto/update-quiz-submission.dto';
import { get } from 'http';

@Controller('quiz-submission')
export class QuizSubmissionController {
  constructor(private readonly quizSubmissionService: QuizSubmissionService) {}

  @Post()
  create(@Body() createQuizSubmissionDto: CreateQuizSubmissionDto) {
    return this.quizSubmissionService.create(createQuizSubmissionDto);
  }
  
  @Get()
  findAll() {
    return this.quizSubmissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizSubmissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizSubmissionDto: UpdateQuizSubmissionDto) {
    return this.quizSubmissionService.update(+id, updateQuizSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizSubmissionService.remove(+id);
  }
}
