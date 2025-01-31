import express from 'express';
import mongoose from 'mongoose';
import {patientRouter} from "./routes/patientRoutes";
require('dotenv').config({ path: './.env.local' });

const url = process.env.MONGODB_URL || "";

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Database Connection (MongoDB)
mongoose.connect(url)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

// Create route for patients endpoints
app.use('/patients', patientRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
