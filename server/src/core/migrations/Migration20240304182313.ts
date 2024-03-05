import { Migration } from '@mikro-orm/migrations';

export class Migration20240304182313 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "transactions" drop constraint "transactions_payer_id_foreign";');
    this.addSql('alter table "transactions" drop constraint "transactions_group_id_foreign";');

    this.addSql('alter table "users" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "users" alter column "created_at" set not null;');
    this.addSql('alter table "users" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "groups" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "groups" alter column "created_at" set not null;');
    this.addSql('alter table "groups" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "users_groups" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "users_groups" alter column "created_at" set not null;');
    this.addSql('alter table "users_groups" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "orders" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "orders" alter column "created_at" set not null;');
    this.addSql('alter table "orders" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "transactions" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "transactions" alter column "created_at" set not null;');
    this.addSql('alter table "transactions" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('drop index "transactions_payer_id_index";');
    this.addSql('drop index "transactions_group_id_index";');
    this.addSql('alter table "transactions" drop column "payer_id";');
    this.addSql('alter table "transactions" drop column "group_id";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users" alter column "created_at" drop not null;');
    this.addSql('alter table "users" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');

    this.addSql('alter table "groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "groups" alter column "created_at" drop not null;');
    this.addSql('alter table "groups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');

    this.addSql('alter table "users_groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_groups" alter column "created_at" drop not null;');
    this.addSql('alter table "users_groups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');

    this.addSql('alter table "orders" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "orders" alter column "created_at" drop not null;');
    this.addSql('alter table "orders" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "orders" alter column "is_active" type boolean using ("is_active"::boolean);');
    this.addSql('alter table "orders" alter column "is_active" set default true;');

    this.addSql('alter table "transactions" add column "payer_id" varchar(255) not null, add column "group_id" varchar(255) not null;');
    this.addSql('alter table "transactions" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "transactions" alter column "created_at" drop not null;');
    this.addSql('alter table "transactions" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "transactions" add constraint "transactions_payer_id_foreign" foreign key ("payer_id") references "users_groups" ("id") on update cascade;');
    this.addSql('alter table "transactions" add constraint "transactions_group_id_foreign" foreign key ("group_id") references "groups" ("id") on update cascade;');
    this.addSql('create index "transactions_payer_id_index" on "transactions" ("payer_id");');
    this.addSql('create index "transactions_group_id_index" on "transactions" ("group_id");');
  }

}
