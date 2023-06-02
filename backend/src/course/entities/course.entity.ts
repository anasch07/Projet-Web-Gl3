import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Content } from '../../content/entities/content.entity';
import { BaseEntity } from 'src/common/base-entity';

@Entity()
@ObjectType({description: 'course'})
export class Course extends BaseEntity {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Field()
  @OneToMany(() => Content, (content) => content.course)
  contents: Content[];
}
