require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', otpRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running');
});
