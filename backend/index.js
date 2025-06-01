const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/db");
const authRoutes = require("./routes/auth");
const fishRoutes = require("./routes/fishes");
const cors = require("cors");
const fishes = require("./controllers/fishes");

const app = express();

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("KalaVennad API töötab");
});

app.use(authRoutes);
app.use(fishRoutes);
app.use('/uploads', express.static('uploads'));

sequelize
  .sync()
  .then(() => {
    app.listen(3002, () => {
      console.log("Server töötab pordil 3002");
    });
  })
  .catch((err) => {
    console.error("Viga andmebaasiga ühendamisel:", err);
  });
