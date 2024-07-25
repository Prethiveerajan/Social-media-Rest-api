const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const router  = require('./routes/User');

dotenv.config(); 

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL; 

const app = express();

app.use(express.json());
app.use(helmet());

app.use(cors());
app.use("/api",router);


mongoose.connect(DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error:', error));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
