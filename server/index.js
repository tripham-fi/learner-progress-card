const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"],
};
const PORT = process.env.PORT || 3000

app.use(cors(corsOptions));
app.use(morgan("dev"))
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ success: true, message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
