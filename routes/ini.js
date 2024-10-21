const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/todos", (req, res) => {
  db.query("SELECT * FROM ini", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

router.post("/todos", (req, res) => {
  const { title , message } = req.body;
  const sql = "INSERT INTO ini (title,message) VALUES (?,?)";
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
  const sql = "DELETE FROM ini WHERE id = ?";
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
 * /ini/todos:
 *   get:
 *     tags: [Ini]
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: A list of todos
 *
 * @swagger
 * /ini/todos:
 *   post:
 *     tags: [Ini]
 *     summary: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created todo
 *
 * @swagger
 * /ini/todos/{id}:
 *   delete:
 *     tags: [Ini]
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
