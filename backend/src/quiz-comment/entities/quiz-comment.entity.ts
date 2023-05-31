import { Quiz } from "src/quiz/entities/quiz.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuizComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @ManyToOne(() => Quiz)
  quiz: Quiz
}
