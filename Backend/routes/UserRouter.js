import express from 'express'
import { currentUser, loginUser, registerUser } from '../controllers/UserController.js';
import validateToken from '../middlerware/validateTokenHandler.js';

const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current",validateToken, currentUser)

export default router;