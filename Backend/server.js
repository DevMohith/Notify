require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//db connection
if (!process.env.MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is missing in .env file.");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

//schema
const Product = mongoose.model("Product", new mongoose.Schema({ name: String }));
const Subscriber = mongoose.model("Subscriber", new mongoose.Schema({ email: String }) );

//nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    },
});

// Api to subscribe users and products api
app.post("/subscribe", async(req, res)=>{
    const { email } = req.body;
    await Subscriber.create({ email });
    res.status(201).json({ message: "Subscribed Successfully! Take a bow 🙇"});
});

app.post("/add-product", async (req, res) => {
    const { name } = req.body;
    const product = await Product.create({ name });

// get all subscribers
const subscribers = await Subscriber.find();
const emailList = subscribers.map((sub) => sub.email);

//send mail To uSer
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailList,
    subject: "New Product Alert!",
    text: `A new product has been added: ${name}`,
};

try {
    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: "Product added & emails sent!" });
  } catch (error) {
    res.status(500).json({ error: "Error sending emails." });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));