const express = require('express');
const db = require('../config/dbConfig');
const { protected } = require('../common/middleware');

const router = express.Router();

router.get('/:id/plants', protected, async (req, res) => {
  const id = req.params.id;
  const plants = await db('plants').where('user_id', id);
  res.status(200).json(plants);
});

router.post('/:id/plants', protected, async (req, res) => {
  try {
    const { id } = req.params;
    const plant = req.body;
    console.log(plant);

    if (!plant.name) {
      res.send(404).json({ error: 'Your plant must have a name' });
    } else {
      const count = await db('plants').insert({ user_id: id, ...plant });
      console.log(count);
      res.status(200).json(count);
    }
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
});

module.exports = router;
