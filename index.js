import express from "express";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/projects", projectRoutes);
app.listen(3500, () => {
  console.log("home");
});
