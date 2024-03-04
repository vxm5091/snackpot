import { Migration } from '@mikro-orm/migrations';

export class Migration20240304033229 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users" alter column "created_at" drop not null;');
    this.addSql('alter table "users" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users" alter column "updated_at" drop not null;');

    this.addSql('alter table "groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "groups" alter column "created_at" drop not null;');
    this.addSql('alter table "groups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "groups" alter column "updated_at" drop not null;');

    this.addSql('alter table "users_groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_groups" alter column "created_at" drop not null;');
    this.addSql('alter table "users_groups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users_groups" alter column "updated_at" drop not null;');

    this.addSql('alter table "orders" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "orders" alter column "created_at" drop not null;');
    this.addSql('alter table "orders" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "orders" alter column "updated_at" drop not null;');

    this.addSql('alter table "transactions" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "transactions" alter column "created_at" drop not null;');
    this.addSql('alter table "transactions" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "transactions" alter column "updated_at" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users" alter column "created_at" set not null;');
    this.addSql('alter table "users" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users" alter column "updated_at" set not null;');

    this.addSql('alter table "groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "groups" alter column "created_at" set not null;');
    this.addSql('alter table "groups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "groups" alter column "updated_at" set not null;');

    this.addSql('alter table "users_groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_groups" alter column "created_at" set not null;');
    this.addSql('alter table "users_groups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users_groups" alter column "updated_at" set not null;');

    this.addSql('alter table "orders" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "orders" alter column "created_at" set not null;');
    this.addSql('alter table "orders" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "orders" alter column "updated_at" set not null;');

    this.addSql('alter table "transactions" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "transactions" alter column "created_at" set not null;');
    this.addSql('alter table "transactions" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "transactions" alter column "updated_at" set not null;');
  }

}
