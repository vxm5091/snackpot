import { Migration } from '@mikro-orm/migrations';

export class Migration20240303230034 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "orders" drop constraint "orders_payer_id_foreign";');

    this.addSql('alter table "orders" add constraint "orders_payer_id_foreign" foreign key ("payer_id") references "users_groups" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "orders" drop constraint "orders_payer_id_foreign";');

    this.addSql('alter table "orders" add constraint "orders_payer_id_foreign" foreign key ("payer_id") references "users" ("id") on update cascade;');
  }

}
