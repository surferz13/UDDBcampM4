const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(process.env.URL_BASE + "/", routes);

app.listen(process.env.PORT, () => {
  console.log(`listent in port ${process.env.PORT}`);
});


