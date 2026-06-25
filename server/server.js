

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./dbConnection")
const articleRoutes = require("./routes/articleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Confirm API is running
app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});

// Confirm Vite can communicate with Express
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

// Confirm connection to the DB
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes

app.use("/api/articles", articleRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});