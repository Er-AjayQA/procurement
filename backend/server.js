// ========== IMPORT STATEMENTS ========== //
const express = require("express");
const db = require("./config/index");
const cors = require("cors");
require("dotenv").config();

// ========== INITIALIZE APP ========== //
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ========== DB SYNC ========== //
// db.sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("DB Sync Successfully............");
//   })
//   .catch((err) => {
//     console.log("DB Sync Failed.............");
//   });

// ========== IMPORTING ROUTES ========== //
const userRoute = require("./API/user/router/user.router");

// ========== ROUTES ========== //
app.get("/", (req, res) => {
  try {
    res.status(200).send({ success: true, message: "API is working fine!" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

app.use("/api/v1/procurement", userRoute);

// ========== LISTEN TO SERVER ========== //
app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Server is running on port: ${PORT}`);
  }
});
