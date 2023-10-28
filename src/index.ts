import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { rateLimit } from "express-rate-limit";
import calendarRouter from "./routes/googleCalenderRoutes";
import oauth2Router from "./routes/googleOauth2Routes";
import airtableRouter from "./routes/airtableRoutes";
import notionRouter from "./routes/notionRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use(oauth2Router);
app.use("/api", calendarRouter);
app.use("/api", airtableRouter);
app.use("/api", notionRouter);

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).send({
    data: null,
    error: {
      code: "NOT_FOUND",
      message: "The requested resource does not exist",
    },
  });
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect("mongodb://localhost:27017/daas-integration-api")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  })
  .catch((error) => {
    throw error;
  });