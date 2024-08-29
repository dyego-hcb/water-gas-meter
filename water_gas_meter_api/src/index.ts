// src/index.ts

import express from 'express';
import { ConnDB } from './db/ConnDB';

// ROUTES
import helloWordRoutes from './routes/HelloWordRoutes';
import confirmationRoutes from './routes/ConfirmationRoutes';
import customerRoutes from './routes/CustomerRoutes';
import measureRoutes from './routes/MeasureRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/helloword', helloWordRoutes);
app.use('/api/confirmation', confirmationRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/measure', measureRoutes);

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
