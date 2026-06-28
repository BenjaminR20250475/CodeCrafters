require("dotenv").config();
const categoryRoutes = require("./routes/categoryRoutes");
const typeRoutes = require("./routes/typeRoutes");
const express = require("express");
const cors = require("cors");
const db = require("./dbConnection")
const articleRoutes = require("./routes/articleRoutes");
console.log(process.env);
console.log("host =", process.env.host);
console.log("user =", process.env.user);
console.log("password =", process.env.password);
console.log("database =", process.env.database);

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
app.use("/api/categories", categoryRoutes);
app.use("/api/types", typeRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});