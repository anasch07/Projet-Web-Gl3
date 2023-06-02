import { BaseEntity } from "src/common/base-entity";
import { Quiz } from "src/quiz/entities/quiz.entity";
import { User } from "src/user/entities/user.entity";
import { JoinColumn } from "typeorm";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({description: 'quizComment'})
export class QuizComment extends BaseEntity {
  @Column()
  @Field()
  comment: string;

  @Column()
  @Field()
  quizId: string;

  @Field(() => Quiz)
  @ManyToOne(() => Quiz)
  @JoinColumn({name: "quizId"})
  quiz: Quiz

  @Column()
  @Field()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({name: "userId"})
  user: User 
}
