import  express from "express";
const app = express()
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import viajesRoutes from "./routes/viajes.js"
import reservasRoutes from "./routes/reservas.js"
import cors from "cors"
import cookieParser from "cookie-parser";


app.use((req, res, next )=>{
    res.header("Access-Control-Allow-Credentials", true )
    next()
})
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
}))
app.use(cookieParser())

app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/viajes",viajesRoutes)
app.use("/api/reservas",reservasRoutes)

app.listen(4000, ()=>{
    console.log("API working")
})
