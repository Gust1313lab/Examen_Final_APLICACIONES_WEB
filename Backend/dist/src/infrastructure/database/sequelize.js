import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres'
});
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL database using Sequelize');
    }
    catch (error) {
        console.error('Error connecting to PostgreSQL database:', error);
    }
};
