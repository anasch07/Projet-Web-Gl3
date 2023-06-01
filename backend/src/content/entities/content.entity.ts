import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from '../../course/entities/course.entity';
import { BaseEntity } from 'src/common/base-entity';

@Entity()
export class Content extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ select: false, nullable: false })
  courseId: string;

  @ManyToOne(() => Course, (course) => course.contents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;
}
