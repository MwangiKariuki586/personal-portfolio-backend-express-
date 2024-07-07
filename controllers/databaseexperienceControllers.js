import { json } from "express";
import { db } from "../connect.js";
export const getDatabase_experience = (req, res) => {
  const q = "Select * from databases_experience order by id desc";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0)
      return res.status(404).json({ message: "no records found" });
    return res.status(200).json(data);
  });
};
export const getSingle = (req, res) => {
  const id = req.params.id;
  const q = "Select * from databases_experience where id = ?";
  db.query(q, id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0)
      return res.status(404).json({ message: "no match found" });
    return res.status(200).json(data);
  });
};
export const createDatabase_experience = (req, res) => {
  const technology = req.body.technology;
  const level_rank = req.body.level_rank;
  const values = [technology, level_rank];
  const q =
    "Insert into databases_experience (`technology`,level_rank) values (?,?)";
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(201).json({ message: "record created successfully" });
  });
};
export const updateDatabase_experience = (req, res) => {
  const technology = req.body.technology;
  const level_rank = req.body.level_rank;
  const id = req.params.id;
  const values = [technology, level_rank, id];
  const q =
    "update databases_experience set technology = ?,level_rank = ? where id = ?";
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.affectedRows === 0)
      return res.status(404).json({ message: "no match found" });
    return res.status(200).json({ message: "record updated successfully" });
  });
};
export const deleteDatabase_experience = (req, res) => {
  const id = req.params.id;
  const q = "delete from databases_experience where id = ?";
  db.query(q, id, (err, data) => {
    if (err) return res.status(500), json({ error: err.message });
    if (data.affectedRows === 0)
      return res.status(404).json({ message: "no match found" });
    return res.status(200).json({ message: "record deleted successfully" });
  });
};
