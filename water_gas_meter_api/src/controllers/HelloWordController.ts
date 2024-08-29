// src/controllers/HelloWordController.ts
import { Request, Response } from 'express';
import { ConnDB } from '../db/ConnDB';

class HelloWordController {
    static checkAPIConnection(req: Request, res: Response) {
        res.status(200).send('Hello World!! The API is working :) !!');
    }

    static async checkDBConnection(req: Request, res: Response) {
        try {
            if (ConnDB.isInitialized) {
                res.status(200).send('Database connection to PostgreSQL using TypeORM is working!');
            }
        } catch (err) {
            console.error('Error connecting to PostgreSQL:', err);
            res.status(500).send('Error connecting to PostgreSQL');
        }
    }
}

export default HelloWordController;
