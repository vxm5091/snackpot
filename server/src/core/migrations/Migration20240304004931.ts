import { Migration } from '@mikro-orm/migrations';

export class Migration20240304004931 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users" alter column "created_at" set default now();');
    this.addSql('alter table "users" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users" alter column "updated_at" set default now();');

    this.addSql('alter table "groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "groups" alter column "created_at" set default now();');
    this.addSql('alter table "groups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "groups" alter column "updated_at" set default now();');

    this.addSql('alter table "users_groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_groups" alter column "created_at" set default now();');
    this.addSql('alter table "users_groups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users_groups" alter column "updated_at" set default now();');

    this.addSql('alter table "orders" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "orders" alter column "created_at" set default now();');
    this.addSql('alter table "orders" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "orders" alter column "updated_at" set default now();');

    this.addSql('alter table "transactions" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "transactions" alter column "created_at" set default now();');
    this.addSql('alter table "transactions" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "transactions" alter column "updated_at" set default now();');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" alter column "created_at" drop default;');
    this.addSql('alter table "users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users" alter column "updated_at" drop default;');
    this.addSql('alter table "users" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');

    this.addSql('alter table "groups" alter column "created_at" drop default;');
    this.addSql('alter table "groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "groups" alter column "updated_at" drop default;');
    this.addSql('alter table "groups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');

    this.addSql('alter table "users_groups" alter column "created_at" drop default;');
    this.addSql('alter table "users_groups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_groups" alter column "updated_at" drop default;');
    this.addSql('alter table "users_groups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');

    this.addSql('alter table "orders" alter column "created_at" drop default;');
    this.addSql('alter table "orders" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "orders" alter column "updated_at" drop default;');
    this.addSql('alter table "orders" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');

    this.addSql('alter table "transactions" alter column "created_at" drop default;');
    this.addSql('alter table "transactions" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "transactions" alter column "updated_at" drop default;');
    this.addSql('alter table "transactions" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
  }

}
