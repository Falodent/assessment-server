const express = require("express");
const dotenv = require("dotenv");
const ianRoutes = require("./routes/ian");
const iniRoutes = require("./routes/ini");
const mubeenRoutes = require("./routes/mubeen");
const mufidRoutes = require("./routes/mufid");
const timRoutes = require("./routes/tim");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/ian", ianRoutes);
app.use("/ini", iniRoutes);
app.use("/mubeen", mubeenRoutes);
app.use("/mufid", mufidRoutes);
app.use("/tim", timRoutes);

app.listen(port, () => {
  console.log("Listening...");
});
