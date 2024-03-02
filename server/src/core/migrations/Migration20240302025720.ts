import { Migration } from '@mikro-orm/migrations';

export class Migration20240302025720 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "orders" drop constraint "orders_payer_user_id_foreign";');

    this.addSql('alter table "transactions" drop constraint "transactions_user_id_foreign";');

    this.addSql('drop index "orders_payer_user_id_index";');

    this.addSql('alter table "orders" rename column "payer_user_id" to "payer_id";');
    this.addSql('alter table "orders" add constraint "orders_payer_id_foreign" foreign key ("payer_id") references "users" ("id") on update cascade;');
    this.addSql('create index "orders_payer_id_index" on "orders" ("payer_id");');

    this.addSql('drop index "transactions_user_id_index";');

    this.addSql('alter table "transactions" add column "recipient_id" varchar(255) not null, add column "group_id" varchar(255) not null;');
    this.addSql('alter table "transactions" add constraint "transactions_recipient_id_foreign" foreign key ("recipient_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "transactions" add constraint "transactions_group_id_foreign" foreign key ("group_id") references "groups" ("id") on update cascade;');
    this.addSql('alter table "transactions" rename column "user_id" to "payer_id";');
    this.addSql('alter table "transactions" add constraint "transactions_payer_id_foreign" foreign key ("payer_id") references "users" ("id") on update cascade;');
    this.addSql('create index "transactions_payer_id_index" on "transactions" ("payer_id");');
    this.addSql('create index "transactions_recipient_id_index" on "transactions" ("recipient_id");');
    this.addSql('create index "transactions_group_id_index" on "transactions" ("group_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "orders" drop constraint "orders_payer_id_foreign";');

    this.addSql('alter table "transactions" drop constraint "transactions_payer_id_foreign";');
    this.addSql('alter table "transactions" drop constraint "transactions_recipient_id_foreign";');
    this.addSql('alter table "transactions" drop constraint "transactions_group_id_foreign";');

    this.addSql('drop index "orders_payer_id_index";');

    this.addSql('alter table "orders" rename column "payer_id" to "payer_user_id";');
    this.addSql('alter table "orders" add constraint "orders_payer_user_id_foreign" foreign key ("payer_user_id") references "users" ("id") on update cascade;');
    this.addSql('create index "orders_payer_user_id_index" on "orders" ("payer_user_id");');

    this.addSql('drop index "transactions_payer_id_index";');
    this.addSql('drop index "transactions_recipient_id_index";');
    this.addSql('drop index "transactions_group_id_index";');
    this.addSql('alter table "transactions" drop column "recipient_id";');
    this.addSql('alter table "transactions" drop column "group_id";');

    this.addSql('alter table "transactions" rename column "payer_id" to "user_id";');
    this.addSql('alter table "transactions" add constraint "transactions_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('create index "transactions_user_id_index" on "transactions" ("user_id");');
  }

}
