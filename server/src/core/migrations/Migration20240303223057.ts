import { Migration } from '@mikro-orm/migrations';

export class Migration20240303223057 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "transactions" drop constraint "transactions_payer_id_foreign";');
    this.addSql('alter table "transactions" drop constraint "transactions_recipient_id_foreign";');

    this.addSql('alter table "transactions" add constraint "transactions_payer_id_foreign" foreign key ("payer_id") references "users_groups" ("id") on update cascade;');
    this.addSql('alter table "transactions" add constraint "transactions_recipient_id_foreign" foreign key ("recipient_id") references "users_groups" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "transactions" drop constraint "transactions_payer_id_foreign";');
    this.addSql('alter table "transactions" drop constraint "transactions_recipient_id_foreign";');

    this.addSql('alter table "transactions" add constraint "transactions_payer_id_foreign" foreign key ("payer_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "transactions" add constraint "transactions_recipient_id_foreign" foreign key ("recipient_id") references "users" ("id") on update cascade;');
  }

}
