import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizSubmissionModule } from './quiz-submission/quiz-submission.module';
import { QuizModule } from './quiz/quiz.module';
import { StatsModule } from './stats/stats.module';
import { ContentModule } from './content/content.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuizQuestionModule } from './quiz-question/quiz-question.module';
import { QuizCommentModule } from './quiz-comment/quiz-comment.module';
import { QuizOptionModule } from './quiz-option/quiz-option.module';
import { CommonModule } from './common/common.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('ENV') == "development",
        dropSchema: true
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    AuthModule,
    CourseModule,
    ContentModule,
    StatsModule,
    QuizModule,
    QuizSubmissionModule,
    QuizCommentModule,
    QuizQuestionModule,
    QuizOptionModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
