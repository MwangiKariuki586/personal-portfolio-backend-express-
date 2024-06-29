import express from "express";
import mysql2 from "mysql2";
const app = express();
const db = mysql2.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "personal portfolio",
});
app.use(express.json());
app.get("/projects", (req, res) => {
  const q = "SELECT * FROM projects";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/projects", (req, res) => {
  const q =
    "INSERT INTO projects(`project_image`,`project_name`,`github_link`,`demo_link`) VALUES(?)";
  const values = [
    req.body.project_image,
    req.body.project_name,
    req.body.github_link,
    req.body.demo_link,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("project added successsfully");
  });
});
app.delete("/projects/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM projects WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("project deleted successfully");
  });
});
app.put("/projects/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE projects SET project_image = ?, project_name = ?, github_link = ?, demo_link = ? WHERE id = ?";
  const values = [
    req.body.project_image,
    req.body.project_name,
    req.body.github_link,
    req.body.demo_link,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("project deleted successfully");
  });
});
app.listen(3500, () => {
  console.log("home");
});
