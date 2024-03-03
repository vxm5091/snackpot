import { Migration } from '@mikro-orm/migrations';

export class Migration20240303215510 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users_groups" drop constraint "users_groups_pkey";');

    this.addSql('alter table "users_groups" add column "id" varchar(255) not null, add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;');
    this.addSql('alter table "users_groups" add constraint "users_groups_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users_groups" drop constraint "users_groups_pkey";');
    this.addSql('alter table "users_groups" drop column "id";');
    this.addSql('alter table "users_groups" drop column "created_at";');
    this.addSql('alter table "users_groups" drop column "updated_at";');

    this.addSql('alter table "users_groups" add constraint "users_groups_pkey" primary key ("user_id", "group_id");');
  }

}
