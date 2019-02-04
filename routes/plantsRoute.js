const express = require('express');
const { plants } = require('../data/dbHelpers');
const { protect } = require('../common/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('plants plants plants!');
});

router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await plants.getPlantById(id);
    res.json(plant);
  } catch (err) {
    res.status(500).json({ error: `oh no!!! ${err}` });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const count = await plants.deletePlantById(id);
    res.status(200).json({ message: `plants deleted: ${count}` });
  } catch (err) {
    res.status(500).json({ error: `error! ${err}` });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    if (changes) {
      const count = await plants.updatePlant(id, changes);
      res.status(200).json(count);
    } else {
      res.status(400).json({ error: 'please provide something to update' });
    }
  } catch (err) {
    res.status(500).json({ error: `there was an error: ${err}` });
  }
});

module.exports = router;
