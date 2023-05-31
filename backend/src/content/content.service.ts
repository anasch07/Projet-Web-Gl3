import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';

import { CourseService } from '../course/course.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';
import { ContentQuery } from './content.query';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContentService {
  constructor(
    private readonly courseService: CourseService,
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
  ) {}

  async save(
    courseId: string,
    createContentDto: CreateContentDto,
  ): Promise<Content> {
    const { name, description } = createContentDto;
    const course = await this.courseService.findById(courseId);
    return await this.contentRepo.save(this.contentRepo.create({
      name,
      description,
      course,
      dateCreated: new Date(),
    }));
  }

  async findAll(contentQuery: ContentQuery): Promise<Content[]> {
    Object.keys(contentQuery).forEach((key) => {
      contentQuery[key] = ILike(`%${contentQuery[key]}%`);
    });

    return await this.contentRepo.find({
      where: contentQuery,
      order: {
        name: 'ASC',
        description: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<Content> {
    const content = await this.contentRepo.findOne(id);

    if (!content) {
      throw new HttpException(
        `Could not find content with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return content;
  }

  async findByCourseIdAndId(courseId: string, id: string): Promise<Content> {
    const content = await this.contentRepo.findOne({ where: { courseId, id } });
    if (!content) {
      throw new HttpException(
        `Could not find content with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return content;
  }

  async findAllByCourseId(
    courseId: string,
    contentQuery: ContentQuery,
  ): Promise<Content[]> {
    Object.keys(contentQuery).forEach((key) => {
      contentQuery[key] = ILike(`%${contentQuery[key]}%`);
    });
    return await this.contentRepo.find({
      where: { courseId, ...contentQuery },
      order: {
        name: 'ASC',
        description: 'ASC',
      },
    });
  }

  async update(
    courseId: string,
    id: string,
    updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    const content = await this.findByCourseIdAndId(courseId, id);
    return await this.contentRepo.save(
      this.contentRepo.create({ id: content.id, ...updateContentDto })
    );
  }

  async delete(courseId: string, id: string): Promise<string> {
    const content = await this.findByCourseIdAndId(courseId, id);
    await this.contentRepo.delete(content);
    return id;
  }

  async count(): Promise<number> {
    return await this.contentRepo.count();
  }
}
