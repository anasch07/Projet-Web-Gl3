import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>
  ) {}
  create(createQuizDto: CreateQuizDto) {
    return 'This action adds a new quiz';
  }

  findAll() {
    return `This action returns all quiz`;
  }

  async findOne(id: string) {
    const quiz = await this.quizRepo.findOne(id);
    if (!quiz) {
      throw new HttpException(
        `Could not find quiz with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return quiz;
  }

  update(id: string, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: string) {
    return `This action removes a #${id} quiz`;
  }
}
