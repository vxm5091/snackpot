import { Migration } from '@mikro-orm/migrations';

export class Migration20240305032512 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" bigserial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) null default now(), "username" text not null, "first_name" text not null, "last_name" text not null, "avatar_url" text null);');

    this.addSql('create table "groups" ("id" bigserial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) null default now(), "group_name" text not null, "avatar_url" text null, "owner_id" bigint not null);');
    this.addSql('create index "groups_owner_id_index" on "groups" ("owner_id");');

    this.addSql('create table "users_groups" ("id" bigserial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) null default now(), "user_id" bigint not null, "group_id" bigint not null);');
    this.addSql('create index "users_groups_user_id_index" on "users_groups" ("user_id");');
    this.addSql('create index "users_groups_group_id_index" on "users_groups" ("group_id");');

    this.addSql('create table "orders" ("id" bigserial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) null default now(), "is_active" boolean not null default true, "payer_id" bigint not null, "group_id" bigint not null);');
    this.addSql('create index "orders_payer_id_index" on "orders" ("payer_id");');
    this.addSql('create index "orders_group_id_index" on "orders" ("group_id");');

    this.addSql('create table "transactions" ("id" bigserial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) null default now(), "item_name" text not null, "item_price" real null, "recipient_id" bigint not null, "order_id" bigint not null);');
    this.addSql('create index "transactions_recipient_id_index" on "transactions" ("recipient_id");');
    this.addSql('create index "transactions_order_id_index" on "transactions" ("order_id");');

    this.addSql('alter table "groups" add constraint "groups_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "users_groups" add constraint "users_groups_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_groups" add constraint "users_groups_group_id_foreign" foreign key ("group_id") references "groups" ("id") on update cascade;');

    this.addSql('alter table "orders" add constraint "orders_payer_id_foreign" foreign key ("payer_id") references "users_groups" ("id") on update cascade;');
    this.addSql('alter table "orders" add constraint "orders_group_id_foreign" foreign key ("group_id") references "groups" ("id") on update cascade;');

    this.addSql('alter table "transactions" add constraint "transactions_recipient_id_foreign" foreign key ("recipient_id") references "users_groups" ("id") on update cascade;');
    this.addSql('alter table "transactions" add constraint "transactions_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "groups" drop constraint "groups_owner_id_foreign";');

    this.addSql('alter table "users_groups" drop constraint "users_groups_user_id_foreign";');

    this.addSql('alter table "users_groups" drop constraint "users_groups_group_id_foreign";');

    this.addSql('alter table "orders" drop constraint "orders_group_id_foreign";');

    this.addSql('alter table "orders" drop constraint "orders_payer_id_foreign";');

    this.addSql('alter table "transactions" drop constraint "transactions_recipient_id_foreign";');

    this.addSql('alter table "transactions" drop constraint "transactions_order_id_foreign";');
  }

}
