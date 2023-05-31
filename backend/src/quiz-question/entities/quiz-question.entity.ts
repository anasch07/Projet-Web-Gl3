import { QuizOption } from "src/quiz-option/entities/quiz-option.entity";
import { Quiz } from "src/quiz/entities/quiz.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuizQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string

  @Column()
  mark: number

  @OneToOne(() => QuizOption, (opt) => opt.question)
  // @JoinColumn({name: "correctOption"})
  correctOption: QuizOption

  @OneToMany(() => QuizOption, (opt) => opt.question)
  wrongOptions: QuizOption[]

  @ManyToOne(() => Quiz)
  quiz: Quiz
}
