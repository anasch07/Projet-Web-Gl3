import { Content } from 'src/content/entities/content.entity';
import { QuizSubmission } from 'src/quiz-submission/entities/quiz-submission.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { QuizQuestion } from '../../quiz-question/entities/quiz-question.entity';
import { BaseEntity } from 'src/common/base-entity';

@Entity()
export class Quiz extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  scheduleDate: Date;

  @Column()
  deadlineDate: Date;

  @OneToMany((type) => QuizSubmission, (sub) => sub.quiz, { eager: true })
  submissions: QuizSubmission[];

  @ManyToOne((type) => Content)
  chaptre: Content;

  @OneToMany((type) => QuizQuestion, (question) => question.quiz, {
    eager: true,
  })
  questions: QuizQuestion[];
}
