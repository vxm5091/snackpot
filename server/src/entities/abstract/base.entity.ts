import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey()
  id!: string;

  @Property()
  createdAt = new Date();

  @Property({
    onUpdate: () => new Date(),
  })
  updatedAt = new Date();
}
