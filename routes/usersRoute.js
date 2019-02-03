const express = require('express');
const {plants} = require('../data/dbHelpers');
const { protect } = require('../common/middleware');

const router = express.Router();

router.get('/:id/plants', protect, async (req, res) => {
  const { id } = req.params;
  const plants = await db('plants').where('user_id', id);
  res.status(200).json(plants);
});

router.post('/:id/plants', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const plant = req.body;
    console.log(plant);

    if (!plant.name) {
      res.status(404).json({ error: 'Your plant must have a name' });
    } else {
      // const count = await db('plants').insert({ user_id: id, ...plant });
      const [plantId] = await plants.addPlant(id, plant);
      console.log(plantId);
      const newPlant = await plants.getPlantById(plantId);
      console.log(newPlant);
      
      res.status(200).json(newPlant);
    }
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
});

module.exports = router;
