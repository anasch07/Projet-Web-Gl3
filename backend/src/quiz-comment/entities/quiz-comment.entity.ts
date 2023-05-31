import { Quiz } from "src/quiz/entities/quiz.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuizComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @ManyToOne(() => Quiz)
  quiz: Quiz

  @ManyToOne(() => User)
  user: User 
}
