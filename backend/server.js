// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const profileRouter = require('./routes/profile.routes');
const dotenv = require('dotenv');

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Database Connected");
});



// Routes
app.use('/api/profiles', profileRouter);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
