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
// db.tbl_state_master
//   .sync({ alter: true })
//   .then(() => {
//     console.log("DB Sync Successfully............");
//   })
//   .catch((err) => {
//     console.log("DB Sync Failed.............");
//     console.error(err);
//   });

// ========== IMPORTING ROUTES ========== //
const userRoute = require("./API/user/router/user.router");
const departmentRoute = require("./API/configurationMasters/department/router/department.router");
const designationRoute = require("./API/configurationMasters/designation/router/designation.router");
const employmentTypeRoute = require("./API/configurationMasters/employmentType/router/employmentType.router");
const areaRoute = require("./API/configurationMasters/area/router/area.router");
const contractTypeRoute = require("./API/configurationMasters/contractType/router/contractType.router");
const allowanceRoute = require("./API/configurationMasters/allowance/router/allowance.router");
const itemCategoryRoute = require("./API/configurationMasters/item_master/router/item_category.router");
const itemRoute = require("./API/configurationMasters/item_master/router/item_master.router");
const uomRoute = require("./API/configurationMasters/uom/router/uom.router");
const serviceCategoryRoute = require("./API/configurationMasters/service_master/router/service_category.router");
const serviceRoute = require("./API/configurationMasters/service_master/router/service_master.router");
const countryUploadRoute = require("./API/configurationMasters/country/router/country.router");
const stateUploadRoute = require("./API/configurationMasters/states/router/states.router");

// ========== ROUTES ========== //
app.get("/", (req, res) => {
  try {
    res.status(200).send({ success: true, message: "API is working fine!" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

app.use("/api/v1/procurement", userRoute);
app.use("/api/v1/procurement", departmentRoute);
app.use("/api/v1/procurement", designationRoute);
app.use("/api/v1/procurement", employmentTypeRoute);
app.use("/api/v1/procurement", areaRoute);
app.use("/api/v1/procurement", contractTypeRoute);
app.use("/api/v1/procurement", allowanceRoute);
app.use("/api/v1/procurement", itemCategoryRoute);
app.use("/api/v1/procurement", itemRoute);
app.use("/api/v1/procurement", uomRoute);
app.use("/api/v1/procurement", serviceCategoryRoute);
app.use("/api/v1/procurement", serviceRoute);
app.use("/api/v1/procurement", countryUploadRoute);
app.use("/api/v1/procurement", stateUploadRoute);

// ========== LISTEN TO SERVER ========== //
app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Server is running on port: ${PORT}`);
  }
});
