import { Exclude } from '@nestjs/class-transformer';
import { QuizSubmission } from 'src/quiz-submission/entities/quiz-submission.entity';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

import { Role } from '../../enums/role.enum';
import { BaseEntity } from 'src/common/base-entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({description: 'user'})
export class User extends BaseEntity {
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  username: string;

  @OneToMany(() => QuizSubmission, (sub) => sub.student)
  submissions: QuizSubmission[];

  @Field()
  @Column({ type: 'enum', enum: Role, default: Role.Student })
  role: Role;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;
}
