import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middleware/error";
const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/v1/auth', limiter);
app.use('/api/v1/auth', authRoutes);

// Error Handler
app.use(errorHandler);

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
