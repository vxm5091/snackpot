import { Entity, PrimaryKey, Property, t } from '@mikro-orm/core';
import uuid from 'uuid';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey({
    type: t.bigint,
    defaultRaw: `next_id()`,
  })
  id!: string;

  @Property({ defaultRaw: 'now()' })
  createdAt: Date;

  @Property({
    onUpdate: () => new Date(),
    defaultRaw: 'now()',
  })
  updatedAt?: Date;
}
