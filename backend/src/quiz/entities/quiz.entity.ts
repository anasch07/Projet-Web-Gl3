import { Content } from 'src/content/entities/content.entity';
import { QuizSubmission } from 'src/quiz-submission/entities/quiz-submission.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { QuizQuestion } from '../../quiz-question/entities/quiz-question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
