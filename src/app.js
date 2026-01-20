import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true,

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended : true, limit :"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

const app = express()



export {app}





















/*app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_ORIGIN.split(",");
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With"
  ],

  exposedHeaders: [
    "Set-Cookie"
  ],

  maxAge: 86400, // 24 hours (preflight cache)
}));
*/