import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizCommentService } from './quiz-comment.service';
import { CreateQuizCommentDto } from './dto/create-quiz-comment.dto';
import { UpdateQuizCommentDto } from './dto/update-quiz-comment.dto';

@Controller('quiz-comment')
export class QuizCommentController {
  constructor(private readonly quizCommentService: QuizCommentService) {}

  @Post()
  create(@Body() createQuizCommentDto: CreateQuizCommentDto) {
    return this.quizCommentService.create(createQuizCommentDto);
  }

  @Get()
  findAll() {
    return this.quizCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizCommentDto: UpdateQuizCommentDto) {
    return this.quizCommentService.update(+id, updateQuizCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizCommentService.remove(+id);
  }
}
