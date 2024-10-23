import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./src/routes/routes.js";
import { handleError } from "./src/helpers/handleError.js";
import functions from "firebase-functions";
import { Web5 } from "@web5/api";
import { web5CommunityConfig } from "./src/config/config.js";

// Initialize app
const app = express();
const port = process.env.CUSTOM_PORT || 3000;

// Initialize Web5
let web5Instance = null;

const initWeb5 = async () => {
  try {
    const { web5 } = await Web5.connect({...web5CommunityConfig});
    web5Instance = web5;
    console.log("Web5 connected successfully.");
  } catch (error) {
    console.error("Failed to connect to Web5:", error);
    process.exit(1); // Exit the process if Web5 fails to initialize
  }
};

initWeb5();

// Middleware
app.use(express.json());

const allowedOrigins = ["http://localhost:8080"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(handleError({ message: "CORS error, request not allowed" }));
      }
    },
  })
);

// Pass Web5 instance to routes
app.use((req, res, next) => {
  req.web5 = web5Instance;
  next();
});

// Routes
app.use(router);

app.get("/", (req, res) => res.send(`<h2>KCC Hackathon Web5 API ⚡</h2>`));

app.listen(port, () => {
  console.log(`App listening on PORT: ${port}`);
});


export const api = functions.https.onRequest(app);