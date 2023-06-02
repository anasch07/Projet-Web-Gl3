import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { QuizSubmissionService } from './quiz-submission.service';
import { CreateQuizSubmissionDto } from './dto/create-quiz-submission.dto';
import { UpdateQuizSubmissionDto } from './dto/update-quiz-submission.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserInfoDto } from 'src/auth/dto/user-info.dto';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('quiz-submission')
export class QuizSubmissionController {
  constructor(private readonly quizSubmissionService: QuizSubmissionService) {}

  @Post()
  create(
      @Body() createQuizSubmissionDto: CreateQuizSubmissionDto, 
      @Req() { user } : {user: UserInfoDto},
    ) {
    return this.quizSubmissionService.create(createQuizSubmissionDto, user);
  }
  
  @Get()
  findAll() {
    return this.quizSubmissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizSubmissionService.findOne(id);
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
