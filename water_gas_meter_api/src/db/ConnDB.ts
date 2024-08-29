// /src/db/ConnDB.ts

import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const ConnDB = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ['src/models/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
});
