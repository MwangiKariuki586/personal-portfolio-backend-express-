import { db } from "../connect.js";
import multer from "multer";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

export const getProjects = (req, res) => {
  const q = "SELECT * FROM projects ORDER BY id DESC";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0)
      return res.status(404).json({ message: "No projects found" });
    return res.status(200).json(data);
  });
};

export const addProject = (req, res) => {
  upload.single("project_image")(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const projectImage = req.file ? req.file.path : null; // Check if file exists
    const projectName = req.body.project_name;
    const githubLink = req.body.github_link;
    const demoLink = req.body.demo_link;

    // Check for duplicate project name
    const checkDuplicateQuery = "SELECT * FROM projects WHERE project_name = ?";
    db.query(checkDuplicateQuery, [projectName], (err, duplicateProjects) => {
      if (err) return res.status(500).json({ error: err.message });
      if (duplicateProjects.length > 0) {
        return res
          .status(400)
          .json({ message: "Project with this name already exists" });
      }

      // Check for duplicate github link
      const checkDuplicateGithubQuery =
        "SELECT * FROM projects WHERE github_link = ?";
      db.query(
        checkDuplicateGithubQuery,
        [githubLink],
        (err, duplicateGithubProjects) => {
          if (err) return res.status(500).json({ error: err.message });
          if (duplicateGithubProjects.length > 0) {
            return res.status(400).json({
              message: "Project with this GitHub link already exists",
            });
          }

          // Check for duplicate demo link
          const checkDuplicateDemoQuery =
            "SELECT * FROM projects WHERE demo_link = ?";
          db.query(
            checkDuplicateDemoQuery,
            [demoLink],
            (err, duplicateDemoProjects) => {
              if (err) return res.status(500).json({ error: err.message });
              if (duplicateDemoProjects.length > 0) {
                return res.status(400).json({
                  message: "Project with this demo link already exists",
                });
              }

              // If no duplicates found, proceed with insertion
              const insertQuery =
                "INSERT INTO projects (`project_image`, `project_name`, `github_link`, `demo_link`) VALUES (?, ?, ?, ?)";
              const values = [projectImage, projectName, githubLink, demoLink];

              db.query(insertQuery, values, (err, data) => {
                if (err) return res.status(500).json({ error: err.message });
                return res.status(201).json({
                  message: "Project added successfully",
                  projectId: data.insertId,
                });
              });
            }
          );
        }
      );
    });
  });
};

export const updateProject = (req, res) => {
  upload.single("project_image")(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const projectId = req.params.id;
    const projectImage = req.file ? req.file.path : null; // Check if file exists
    const projectName = req.body.project_name;
    const githubLink = req.body.github_link;
    const demoLink = req.body.demo_link;

    // Check for duplicate project name
    const checkDuplicateQuery =
      "SELECT * FROM projects WHERE project_name = ? AND id != ?";
    db.query(
      checkDuplicateQuery,
      [projectName, projectId],
      (err, duplicateProjects) => {
        if (err) return res.status(500).json({ error: err.message });
        if (duplicateProjects.length > 0) {
          return res
            .status(400)
            .json({ message: "Project with this name already exists" });
        }

        // Check for duplicate github link
        const checkDuplicateGithubQuery =
          "SELECT * FROM projects WHERE github_link = ? AND id != ?";
        db.query(
          checkDuplicateGithubQuery,
          [githubLink, projectId],
          (err, duplicateGithubProjects) => {
            if (err) return res.status(500).json({ error: err.message });
            if (duplicateGithubProjects.length > 0) {
              return res.status(400).json({
                message: "Project with this GitHub link already exists",
              });
            }

            // Check for duplicate demo link
            const checkDuplicateDemoQuery =
              "SELECT * FROM projects WHERE demo_link = ? AND id != ?";
            db.query(
              checkDuplicateDemoQuery,
              [demoLink, projectId],
              (err, duplicateDemoProjects) => {
                if (err) return res.status(500).json({ error: err.message });
                if (duplicateDemoProjects.length > 0) {
                  return res.status(400).json({
                    message: "Project with this demo link already exists",
                  });
                }

                // If no duplicates found, proceed with update
                const updateQuery =
                  "UPDATE projects SET project_image = ?, project_name = ?, github_link = ?, demo_link = ? WHERE id = ?";
                const values = [
                  projectImage,
                  projectName,
                  githubLink,
                  demoLink,
                  projectId,
                ];

                db.query(updateQuery, values, (err, data) => {
                  if (err) return res.status(500).json({ error: err.message });
                  if (data.affectedRows === 0)
                    return res
                      .status(404)
                      .json({ message: "Project not found" });
                  return res
                    .status(200)
                    .json({ message: "Project updated successfully" });
                });
              }
            );
          }
        );
      }
    );
  });
};

export const deleteProject = (req, res) => {
  const projectId = req.params.id;
  const q = "DELETE FROM projects WHERE id = ?";
  db.query(q, [projectId], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.affectedRows === 0)
      return res.status(404).json({ message: "Project not found" });
    return res.status(200).json({ message: "Project deleted successfully" });
  });
};
