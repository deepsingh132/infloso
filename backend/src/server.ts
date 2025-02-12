import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import cors from "cors";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middleware/error";
import { keepAlive } from "./utils/keepAlive";
const app = express();

dotenv.config();

const port = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const allowedOrigins = [
  "http://localhost:3000",
  FRONTEND_URL
]

// CORS
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

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

// Keep-alive cron job (to avoid cold start on render.com)
(async () => {
  keepAlive(process.env.BACKEND_URL).then((job) => {
    if (job) {
      job.start();
    }
  }).catch((error) => {
    console.error("Error starting keep-alive job:", error);
  });
})();

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
