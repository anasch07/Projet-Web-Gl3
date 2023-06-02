import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { QuizSubmissionModule } from 'src/quiz-submission/quiz-submission.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature(
      [User]
    ),
    QuizSubmissionModule
  ]
})
export class UserModule {}
