const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const env = require("./config/env");

const app = express();
const CLIENT_URL = env.CLIENT_URL;
const PORT = env.PORT;
const corsOptions = {
  origin: [CLIENT_URL],
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Hello World"  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
