const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const { connectPostgresDB } = require('./config/pgsql');
const middlewares = require('./middlewares/handlingMiddleware');
const app = express();

// All middlewares and routes are registered here ... 
app.use(express.json());
app.use("/api", productRoutes)
app.use("/auth", userRoutes)
app.use("/health", middlewares.healthCheckHandling); // This Route is only for checking server is running or not ...
app.use("/generate-token", middlewares.generateToken);
app.use(middlewares.loggingHandling);
app.use(middlewares.notFoundHandling);

const startServer = async () => {
  const HOST = process.env.SERVER_HOST;
  const PORT = process.env.SERVER_PORT;
  await connectPostgresDB()

  // Finally Server listening in the last after all the succesfull operations ...
  app.listen(PORT, HOST, (err) => {
    if (err) throw new Error(err.message);
  });
  return { host: HOST, port: PORT }
};

module.exports = startServer;