// src/index.ts

import express from 'express';
import { ConnDB } from './db/ConnDB';
import helloWordRoutes from './routes/HelloWordRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', helloWordRoutes);

ConnDB.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err: any) => {
        console.error('Error during Data Source initialization:', err);
    });
