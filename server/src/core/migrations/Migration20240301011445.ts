import { Migration } from '@mikro-orm/migrations';

export class Migration20240301011445 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "username" text not null, "first_name" text not null, "last_name" text not null, "avatar_url" text null, constraint "users_pkey" primary key ("id"));');

    this.addSql('create table "groups" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "group_name" text not null, "avatar_url" text null, "owner_id" varchar(255) not null, constraint "groups_pkey" primary key ("id"));');
    this.addSql('create index "groups_owner_id_index" on "groups" ("owner_id");');

    this.addSql('create table "orders" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "is_active" boolean not null default true, "payer_user_id" varchar(255) not null, "group_id" varchar(255) not null, constraint "orders_pkey" primary key ("id"));');
    this.addSql('create index "orders_payer_user_id_index" on "orders" ("payer_user_id");');
    this.addSql('create index "orders_group_id_index" on "orders" ("group_id");');

    this.addSql('create table "transactions" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "item_name" text not null, "item_price" real null, "user_id" varchar(255) not null, "order_id" varchar(255) not null, constraint "transactions_pkey" primary key ("id"));');
    this.addSql('create index "transactions_user_id_index" on "transactions" ("user_id");');
    this.addSql('create index "transactions_order_id_index" on "transactions" ("order_id");');

    this.addSql('create table "users_groups" ("user_id" varchar(255) not null, "group_id" varchar(255) not null, constraint "users_groups_pkey" primary key ("user_id", "group_id"));');
    this.addSql('create index "users_groups_user_id_index" on "users_groups" ("user_id");');
    this.addSql('create index "users_groups_group_id_index" on "users_groups" ("group_id");');

    this.addSql('alter table "groups" add constraint "groups_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "orders" add constraint "orders_payer_user_id_foreign" foreign key ("payer_user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "orders" add constraint "orders_group_id_foreign" foreign key ("group_id") references "groups" ("id") on update cascade;');

    this.addSql('alter table "transactions" add constraint "transactions_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "transactions" add constraint "transactions_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update cascade;');

    this.addSql('alter table "users_groups" add constraint "users_groups_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_groups" add constraint "users_groups_group_id_foreign" foreign key ("group_id") references "groups" ("id") on update cascade;');
  }

}
