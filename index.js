import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import session from "express-session";
import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.routes.js"


// using dotenv
dotenv.config()

const app = express();

app.use(express.json())

// Session config
app.use(
    session({
        secret : process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:true,
        cookie:{
            maxAge:1000 * 60 * 10 // 10 mins
        }
    })
)


const PORT = process.env.PORT || 5000


// Routes

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/user", userRoutes);
app.use("/api/task",taskRoutes);

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT : ${PORT}`);
    })
}).catch((error) => {
    console.log("Error connecting to Database : ", error.message);
    
})


