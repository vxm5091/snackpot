import { Migration } from '@mikro-orm/migrations';

export class Migration20230131185655 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'CREATE SEQUENCE IF NOT EXISTS public.table_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1',
    );
    this.addSql(
      "CREATE OR REPLACE FUNCTION public.next_id() RETURNS bigint LANGUAGE plpgsql AS $$ DECLARE our_epoch bigint := 1636331031000; result bigint; seq_id bigint; now_millis bigint; shard_id int := 20; BEGIN SELECT nextval('table_id_seq') % 1024 INTO seq_id; SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis; result := (now_millis - our_epoch) << 22;result := result | (shard_id << 10); result := result | (seq_id); RETURN result; END; $$;",
    );
  }
}
