import express from "express";
import connectDB from "./connection.js";
import cors from "cors";
import AuthRoutes from "./Routes/AuthRoutes.js"
import adminRoutes from "./Routes/admineRoutes.js";
import ProductsRoutes from "./Routes/ProductsRoutes.js";
import UserRoutes from "./Routes/UserMangmentRoutes.js";
import CategoryRoutes from './Routes/CategoryRoutes.js'; // ✅
import CartRoutes from "./Routes/CartRoutes.js"
import Razorpayrouter from "./Routes/razorpayRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
// import MailerRoutes from "./Routes/MailersRoutes.js"
import WislistRoute  from './Routes/WislistRoutes.js'
import SerchRouter from './Routes/SerchRoutes.js'
import dotenv from "dotenv";
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(cors({
   origin: [
    "http://localhost:5173",
    "https://furniture-store-rho-blond.vercel.app/"
  ],
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
app.use('/category', CategoryRoutes)  // catagoey 
app.use('/cart', CartRoutes)
app.use('/wislist', WislistRoute)
app.use('/razorpay', Razorpayrouter) // payment gateway
app.use('/order', orderRouter)
app.use('/search',SerchRouter)
// app.use('/mailer',MailerRoutes)
app.get('/', (req, res) => {
  res.send('Backend is working!');
});
app.listen(4000, () => {
  console.log("https://furniture-store-backend-29c0.onrender.com");
})
 
