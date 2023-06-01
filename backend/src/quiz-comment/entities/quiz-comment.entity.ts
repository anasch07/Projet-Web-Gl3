import { BaseEntity } from "src/common/base-entity";
import { Quiz } from "src/quiz/entities/quiz.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuizComment extends BaseEntity {
  @Column()
  comment: string;

  @ManyToOne(() => Quiz)
  quiz: Quiz

  @ManyToOne(() => User)
  user: User 
}
