import { BaseEntity } from 'src/common/base-entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class QuizSubmission extends BaseEntity {
  @ManyToOne(() => Quiz, (q) => q.submissions)
  quiz: Quiz;

  @ManyToOne(() => User)
  student: User;

  @Column()
  creationDate: Date;

  @Column()
  mark: number;
}
