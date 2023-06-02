import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from '../../course/entities/course.entity';
import { BaseEntity } from 'src/common/base-entity';

@Entity()
@ObjectType({description: 'content'})
export class Content extends BaseEntity {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column({ select: false, nullable: false })
  @Field()
  courseId: string;

  @Field()
  @ManyToOne(() => Course, (course) => course.contents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;
}
