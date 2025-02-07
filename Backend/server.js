const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./config/db");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5050;

app.listen(PORT, async () => {
  await connect();
  console.log(`Server up and running on port: ${PORT}`);
});

// const startServer = async () => {
//   try {
//     await connect(); // Connect to MongoDB first
//     app.listen(PORT, () => {
//       console.log(`Server up and running on port: ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to connect to the database:", error);
//     process.exit(1); // Exit the process if DB connection fails
//   }
// };
