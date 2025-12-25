import express from 'express';
import { createUser, updateUser, deleteUser, readUser, readAllUser } from '../controllers/user.controller.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', auth, readAllUser);
router.get('/me', auth, readUser);
router.post('/create', createUser);
router.put('/update/', auth, updateUser);

router.delete('/delete/:id', auth, deleteUser);

export default router;  