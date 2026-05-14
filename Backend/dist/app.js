import express from 'express';
import cors from 'cors';
import { registerRoutes } from './index';
export const app = express();
const corsOptions = {
    origin: 'http://localhost:4200',
    Credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('/{*any}', cors(corsOptions));
app.use(express.json());
registerRoutes(app);
