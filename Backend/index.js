import express from "express";
import connection from "./connection.js";
import cors from "cors";
import AuthRoutes from "./Routes/AuthRoutes.js"
import adminRoutes from "./Routes/admineRoutes.js";
import ProductsRoutes from "./Routes/ProductsRoutes.js";
import UserRoutes from "./Routes/UserMangmentRoutes.js";
import CatgoeryRoutes from "./Routes/CatgoeyRoutes.js"
import CartRoutes from "./Routes/CartRoutes.js"
import Razorpayrouter from "./Routes/razorpayRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
// import MailerRoutes from "./Routes/MailersRoutes.js"
import WislistRoute  from './Routes/WislistRoutes.js'
import SerchRouter from './Routes/SerchRoutes.js'
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use('/api', AuthRoutes)  // logine and register 
app.use('/api', adminRoutes); // admine dasbord mate only 
app.use('/product', ProductsRoutes) // product mangment mate 
app.use('/user', UserRoutes) // users mangment mate 
app.use('/category', CatgoeryRoutes)  // catagoey 
app.use('/cart', CartRoutes)
app.use('/wislist', WislistRoute)
app.use('/razorpay', Razorpayrouter) // payment gateway
app.use('/order', orderRouter)
app.use('/serch',SerchRouter)
// app.use('/mailer',MailerRoutes)

app.listen(4000, () => {
  console.log("server is running on port 4000");
})