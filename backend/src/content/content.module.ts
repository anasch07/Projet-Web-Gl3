import { forwardRef, Module } from '@nestjs/common';

import { CourseModule } from '../course/course.module';
import { ContentService } from './content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';

@Module({
  imports: [
    forwardRef(() => CourseModule),
    TypeOrmModule.forFeature(
      [Content]
    )
  ],
  controllers: [],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
