import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

const config: Options<PostgreSqlDriver> = {
  baseDir: process.cwd(),
  driver: PostgreSqlDriver,
  extensions: [Migrator, SeedManager],
  entities: ['./dist/entities/**/*.entity.js'],
  entitiesTs: ['./src/entities/**/*.entity.ts'],
  discovery: {
    warnWhenNoEntities: true,
  },

  entityGenerator: {
    bidirectionalRelations: true,
    identifiedReferences: true,
  },
  forceUtcTimezone: true,
  tsNode: process.env.NODE_ENV === 'development',
  clientUrl: process.env.DB_URL,
  resultCache: {
    expiration: 2000,
  },
  metadataProvider: TsMorphMetadataProvider,
  registerRequestContext: false,

  debug: process.env.NODE_ENV !== 'production',
  logger: msg => {
    const logger = new Logger('MikroORM');

    logger.log(msg);
  },
  pool: {
    min: 0,
    max: 10,
  },
  driverOptions: {
    connection: {
      keepalives_idle: 120,
      ssl:
        process.env.NODE_ENV === 'development'
          ? null
          : {
              rejectUnauthorized: false,
            },
    },
  },
  seeder: {
    path: 'src/data/seeders',
    pathTs: 'src/data/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => `${className}`, // seeder file naming convention
  },
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: 'dist/core/migrations',
    pathTs: 'src/core/migrations',
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: false, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: false, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting,
  },
};

export default config;
