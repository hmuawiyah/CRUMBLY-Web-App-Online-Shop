import express from 'express';
import { cancelOrder, checkExpiredOrder, createOrder, readAllOrders, readAllOrdersBuyer, readOrder, updateOrder } from '../controllers/orders.controller.js';
import auth from '../middleware/auth.js';
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();

router.get('/', auth, readAllOrders);
router.get('/me', auth, readAllOrdersBuyer);
router.get('/:id', auth, readOrder);
router.post('/create', auth, createOrder);
router.put('/update/:id', auth, updateOrder);
router.delete('/delete/:id',auth, cancelOrder);

router.post('/check', auth, checkExpiredOrder);
// router.delete('/delete/:id',auth, authorizeRole("ADMIN"), deleteOrder);

export default router;