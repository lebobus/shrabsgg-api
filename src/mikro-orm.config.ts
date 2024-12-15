// import { Logger } from '@nestjs/common';
// import { User } from './entities/user.entity';
// import { defineConfig } from '@mikro-orm/mongodb';
// import { BaseEntity } from './entities/base.entity';
// import { readdirSync } from 'fs';
// import { extname, join } from 'path';

// const logger = new Logger('MikroORM');

// export default defineConfig({
//   entities: ,
//   dbName: 'shrabsgg',
//   port: 3307,
//   debug: true,
//   logger: logger.log.bind(logger),
// });import { defineConfig } from '@mikro-orm/mysql';
import { defineConfig } from '@mikro-orm/mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  clientUrl: process.env.DATABASE_CLIENT_URL,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
  // allowGlobalContext: true,
});
