const express = require('express');
const db = require('../config/dbConfig');
const { protected } = require('../common/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('plants plants plants!');
});

router.get('/:id', protected, async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await db('plants').where({ id });
    res.json(plant);
  } catch (err) {
    res.status(500).json({ error: `oh no!!! ${err}` });
  }
});

router.delete('/:id', protected, async (req, res) => {
  try {
    const { id } = req.params;
    const count = await db('plants')
      .where({ id })
      .delete();
    console.log(count);
    res.status(200).json({ message: `plant deleted: ${count}` });
  } catch (err) {
    res.status(500).json({ error: `error! ${err}` });
  }
});

router.put('/:id', protected, async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    console.log(req.body);
    const count = await db('plants')
      .where({ id })
      .update(changes);
    res.status(200).json(count);
  } catch (err) {
    res.status(500).json({ error: `there was an error: ${err}` });
  }
});

module.exports = router;
