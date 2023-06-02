import { BaseEntity } from "src/common/base-entity";
import { Quiz } from "src/quiz/entities/quiz.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class QuizComment extends BaseEntity {
  @Column()
  comment: string;

  @Column()
  quizId: string;

  @ManyToOne(() => Quiz)
  @JoinColumn({name: "quizId"})
  quiz: Quiz

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({name: "userId"})
  user: User 
}
