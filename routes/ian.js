const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/todos", (req, res) => {
  db.query("SELECT * FROM ian", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

router.post("/todos", (req, res) => {
  const { title , message } = req.body;
  const sql = "INSERT INTO ian (title,message) VALUES (?,?)";
  db.query(sql, [title,message], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, title });
    }
  });
});

router.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM ian WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: "Todo deleted" });
    }
  });
});

/**
 * @swagger
 * /ian/todos:
 *   get:
 *     tags: [Ian]
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: A list of todos
 *
 * @swagger
 * /ian/todos:
 *   post:
 *     tags: [Ian]
 *     summary: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - message
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created todo
 *
 * @swagger
 * /ian/todos/{id}:
 *   delete:
 *     tags: [Ian]
 *     summary: Delete a todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted
 */

module.exports = router;
