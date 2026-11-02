const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const PORT = process.env.PORT || 3000;
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
