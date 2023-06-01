import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseSearchDto } from './dto/course-search.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>
  ) {}
  async save(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseRepo.save(this.courseRepo.create({
      ...createCourseDto,
      dateCreated: new Date(),
    }));
  }

  async findAll(courseQuery: CourseSearchDto): Promise<Course[]> {
    Object.keys(courseQuery).forEach((key) => {
      courseQuery[key] = ILike(`%${courseQuery[key]}%`);
    });
    return await this.courseRepo.find({
      where: courseQuery,
      order: {
        name: 'ASC',
        description: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<Course> {
    const course = await this.courseRepo.findOne(id);
    if (!course) {
      throw new NotFoundException(`Could not find course with matching id ${id}`)
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findById(id);
    return await this.courseRepo.save( this.courseRepo.create({ id: course.id, ...updateCourseDto }));
  }

  async delete(id: string): Promise<string> {
    const course = await this.findById(id);
    await this.courseRepo.delete(course);
    return id;
  }

  async count(): Promise<number> {
    return await this.courseRepo.count();
  }
}
