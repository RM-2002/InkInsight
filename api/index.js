import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";
import multer from "multer";
import path  from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


dotenv.config();

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
)


app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

URL = "mongodb+srv://blog:blog34@cluster0.53n4xs2.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));




  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

  const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

   app.use("/api/auth", authRoute);
   app.use("/api/users", userRoute);
   app.use("/api/posts", postRoute);
   app.use("/api/categories", categoryRoute);



app.listen("5000", () => {
    console.log("Backend is running.");
  });
  
