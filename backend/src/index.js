const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("", require("./routes/mistral.route"));

app.listen(port, () => {
  console.log(`⭐👍 App lancée sur le port ${port}`);
});
