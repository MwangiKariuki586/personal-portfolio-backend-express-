import express from "express";
import projectRoutes from "./routes/projectRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import contactRoutes from "./routes/contactmeRoutes.js";
import backend_experience_Routes from "./routes/backendexperienceRoutes.js";
import database_experience_Routes from "./routes/databaseexperienceRoutes.js";
import frontend_experience_Routes from "./routes/frontendexpreienceRoutes.js";
const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/projects", projectRoutes);
app.use("/about", aboutRoutes);
app.use("/contact", contactRoutes);
app.use("/backend_experience", backend_experience_Routes);
app.use("/database_experience", database_experience_Routes);
app.use("/frontend_experience", frontend_experience_Routes);
app.listen(3500, () => {
  console.log("home");
});
