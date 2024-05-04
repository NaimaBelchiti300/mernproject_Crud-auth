const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDb = require('./config/db');
const cors = require('cors'); // Importez le module cors
const port = process.env.PORT || 5000;

const app = express();
connectDb();

// Ajoutez cors comme middleware global
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
