import express from 'express';
import cors from 'cors';
import { registerRoutes } from './index';
export const app = express();
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('/{*any}', cors(corsOptions));
app.use(express.json());
registerRoutes(app);
