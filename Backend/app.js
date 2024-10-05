import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passwordRouter from  "./routes/PasswordRouter.js" 
import userRouter from "./routes/UserRouter.js";
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });


const app = express();
app.use(express.json()); // To parse JSON in request bodies
app.use(cors({ origin:  'http://localhost:5173' }));


mongoose.connect('mongodb://localhost:27017/password-manager')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

app.use( "/api/passwords" , passwordRouter );
app.use( "/api/users" , userRouter );


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
