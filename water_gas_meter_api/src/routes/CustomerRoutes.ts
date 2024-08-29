// src/routes/CustomerRoutes.ts

import express from 'express';

// CONTROLLERS
import CustomerController from '../controllers/CustomerController';

const router = express.Router();

router.get('/get-all', CustomerController.getAllCustomers);
router.get('/get-by-id/:id', CustomerController.getCustomerById);
router.get('/get-by-customer-code/:id', CustomerController.getCustomerByCustomerCode);
router.post('/register', CustomerController.createCustomer);
router.put('/edit/:id', CustomerController.updateCustomer);
router.delete('/delete/:id', CustomerController.deleteCustomer);

export default router;
