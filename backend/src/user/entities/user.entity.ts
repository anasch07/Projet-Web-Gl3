import { Exclude } from 'class-transformer';
import { QuizSubmission } from 'src/quiz-submission/entities/quiz-submission.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../../enums/role.enum';
import { BaseEntity } from 'src/common/base-entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @OneToMany(() => QuizSubmission, (sub) => sub.student)
  submissions: QuizSubmission[];

  @Column({ type: 'enum', enum: Role, default: Role.Student })
  role: Role;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({ default: true })
  isActive: boolean;
}
