import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  id: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date
  
  @Field()
  @UpdateDateColumn()
  updatedAt: Date
  
  @Field()
  @DeleteDateColumn()
  deletedAt: Date
}
