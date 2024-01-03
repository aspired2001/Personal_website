// backend/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/contactFormDB";

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, // Note: This option is deprecated but keeping it for backward compatibility.
    useUnifiedTopology: true,
});
console.log("MongoDB has started");
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    description: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// CRUD operations
app.post("/api/contact", async (req, res) => {
    const { name, email, description } = req.body;
    try {
        const newContact = new Contact({ name, email, description });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/api/contact", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Additional CRUD routes (update and delete) can be added as needed.

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
