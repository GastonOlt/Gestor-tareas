import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
})
