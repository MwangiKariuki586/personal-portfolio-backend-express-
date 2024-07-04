import multer from "multer";
import { db } from "../connect.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // File naming strategy
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage });
export const getAbout = (req, res) => {
  const q = "SELECT* FROM about ORDER BY id DESC";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0)
      return res.status(404).json({ message: "No records found" });
    return res.status(200).json(data);
  });
};
export const addAbout = (req, res) => {
  upload.fields([
    {
      name: "first_image",
      maxCount: 1,
    },
    {
      name: "second_image",
      maxCount: 1,
    },
  ])(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Logging the files and body received in the request
    console.log("Files:", req.files);
    console.log("Body:", req.body);

    const first_image = req.files["first_image"]
      ? req.files["first_image"][0].path
      : null;
    const second_image = req.files["second_image"]
      ? req.files["second_image"][0].path
      : null;
    const greetings = req.body.greetings;
    const full_name = req.body.full_name;
    const title = req.body.title;
    const linkedin = req.body.linkedin;
    const github = req.body.github;
    const years_of_experience = req.body.years_of_experience;
    const course_studied = req.body.course_studied;

    if (
      !first_image ||
      !second_image ||
      !greetings ||
      !full_name ||
      !title ||
      !linkedin ||
      !github ||
      !years_of_experience ||
      !course_studied
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const q =
      "INSERT INTO about (`greetings`,`full_name`,`title`,`first_image`,`second_image`,`linkedin`,`github`,`years_of_experience`,`course_studied`) VALUES(?,?,?,?,?,?,?,?,?)";
    const values = [
      greetings,
      full_name,
      title,
      first_image,
      second_image,
      linkedin,
      github,
      years_of_experience,
      course_studied,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(201).json({ message: "Record added Successfully" });
    });
  });
};

export const updateAbout = (req, res) => {
  upload.fields([
    {
      name: "first_image",
      maxCount: 1,
    },
    {
      name: "second_image",
      maxCount: 1,
    },
  ])(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const aboutId = req.params.id;
    const greetings = req.body.greetings;
    const full_name = req.body.full_name;
    const title = req.body.title;
    const linkedin = req.body.linkedin;
    const github = req.body.github;
    const years_of_experience = req.body.years_of_experience;
    const course_studied = req.body.course_studied;
    let first_image = req.body.first_image_path;
    let second_image = req.body.second_image_path;

    if (req.files["first_image"]) {
      first_image = req.files["first_image"][0].path;
    }
    if (req.files["second_image"]) {
      second_image = req.files["second_image"][0].path;
    }
    if (
      !req.files["first_image"] ||
      !req.files["second_image"] ||
      !greetings ||
      !full_name ||
      !title ||
      !linkedin ||
      !github ||
      !years_of_experience ||
      !course_studied
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const q =
      "UPDATE about SET first_image = ?,second_image = ?,greetings = ?,full_name = ?,title = ?,linkedin = ?,github = ?,years_of_experience = ?,course_studied = ?";
    const values = [
      first_image,
      second_image,
      greetings,
      full_name,
      title,
      linkedin,
      github,
      years_of_experience,
      course_studied,
      aboutId,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      if (data.affectedRows === 0)
        return req.status(404).json({ message: "Record not found" });
      return res.status(200).json({ message: "Record updated Successfully" });
    });
  });
};
export const deleteAbout = (req, res) => {
  const aboutId = req.params.id;
  const q = "DELETE FROM about WHERE id =?";
  db.query(q, [aboutId], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.affectedRows === 0)
      return res.status(404).json({ message: "record not found" });
    return res.status(200).json({ message: "record deleted successfully" });
  });
};
