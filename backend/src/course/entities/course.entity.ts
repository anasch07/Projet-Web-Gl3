import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

import { Content } from '../../content/entities/content.entity';
import { BaseEntity } from 'src/common/base-entity';

@Entity()
export class Course extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Content, (content) => content.course)
  contents: Content[];
}
