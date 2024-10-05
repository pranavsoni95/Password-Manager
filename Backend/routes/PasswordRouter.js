import express from 'express';
import { getPasswords, createPassword, deletePassword } from '../controllers/PasswordController.js';
import validateToken from '../middlerware/validateTokenHandler.js';

const router = express.Router();

router.use(validateToken);

router.route('/')
    .get(getPasswords)  
    .post(createPassword); // Create a new password

router.route('/:id')
    .delete(deletePassword); // Delete a password by ID

export default router;
