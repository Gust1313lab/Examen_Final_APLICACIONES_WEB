import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        await client.query('SELECT NOW()');
        console.log('Connected to PostgreSQL database using pg');
    } catch (error) {
        console.error('Error connecting to PostgreSQL database:', error);
    }
};