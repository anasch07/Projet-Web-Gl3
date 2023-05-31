import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';

@Controller('quiz-question')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @Post()
  create(@Body() createQuizQuestionDto: CreateQuizQuestionDto, @Param('quizId') quizId: string) {
    return this.quizQuestionService.create(createQuizQuestionDto, quizId);
  }

  @Get(':id')
  findByQuizID(@Param('id') quizId: string) {
    return this.quizQuestionService.findByQuizID(quizId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizQuestionDto: UpdateQuizQuestionDto) {
    return this.quizQuestionService.update(id, updateQuizQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizQuestionService.remove(id);
  }
}
