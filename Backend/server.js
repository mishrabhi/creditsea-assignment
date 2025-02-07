const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./config/db");
const uploadRoutes = require("./routes/upload");
const reportRoutes = require("./routes/reports");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5050;

//routes
app.use("/uploads", uploadRoutes);
app.use("/reports", reportRoutes);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server up and running on port: ${PORT}`);
});
