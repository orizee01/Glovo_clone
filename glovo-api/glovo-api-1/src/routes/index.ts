import { Router } from 'express';
import customerController from '../customer/controller';

const router = Router();

// Define routes for customer-related operations
router.post('/customers', customerController.createCustomer);
router.get('/customers/:id', customerController.getCustomer);
router.put('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);

// Export the router
export default router;