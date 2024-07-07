import { db } from "../connect.js";
export const getContact = (req, res) => {
  const q = "SELECT * FROM contact_me ORDER BY id DESC";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0)
      return res.status(404).json({ message: "No records found" });
    return res.status(200).json(data);
  });
};
export const getsingleContact = (req, res) => {
  const contactID = req.params.id;
  const q = "SELECT * FROM contact_me WHERE id = ?";
  db.query(q, contactID, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0)
      return res.status(404).json({ message: "No record found" });
    return res.status(200).json(data);
  });
};
export const createContact = (req, res) => {
  const q = "INSERT INTO contact_me (`email`,`linkedin`) VALUES(?,?)";
  const email = req.body.email;
  const linkedin = req.body.linkedin;
  const values = [email, linkedin];

  console.log("Body:", req.body);
  //   if (!email && !linkedin) {
  //     res.status(400).json({ error: "Missing required fields" });
  //   }
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(201).json({ message: "Record added Successfully" });
  });
};
export const updateContact = (req, res) => {
  const q = "UPDATE contact_me SET email = ? , linkedin = ? WHERE id = ?";
  const email = req.body.email;
  const linkedin = req.body.linkedin;
  const contactID = req.params.id;
  const values = [email, linkedin, contactID];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log("Body:", req.body);
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "record not found" });
    }
    return res.status(200).json({ message: "record updated successfully" });
  });
};
export const deleteContact = (req, res) => {
  const contactID = req.params.id;
  const q = "DELETE from contact_me WHERE id = ?";
  db.query(q, contactID, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.affectedRows === 0)
      return res.status(404).json({ error: "record not found" });
    res.status(200).json({ message: "record deleted successfully" });
  });
};
