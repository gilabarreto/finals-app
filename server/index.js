const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json()); //req.body
app.use(cors());

//ROUTES//

//Register and Login routes

app.use("/auth", require("./routes/jwtAuth"));

//Favourite route

app.use("/favourite", require("./routes/favourite"))

//Dashbaord route

app.use("/dashboard", require("./routes/dashboard"));

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
