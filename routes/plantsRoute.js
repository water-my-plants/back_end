const express = require('express');
const { plants } = require('../data/dbHelpers');
const { protect } = require('../common/middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const plantList = await plants.getAllPlants();
    res.status(200).json(plantList);
  } catch (err) {
    res
      .status(500)
      .json({ error: `there was an error accessing the databse: ${err}` });
  }
});

// get a plant
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await plants.getPlantById(id);
    res.json(plant);
  } catch (err) {
    res.status(500).json({ error: `oh no!!! ${err}` });
  }
});

// delete a plant
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.decodedToken;

    // get plant and ensure that it is owned by user
    const plant = await plants.getPlantById(id);
    if (plant.user_id === userId) {
      const count = await plants.deletePlantById(id);
      if (count) {
        res.status(200).json({ message: 'plant deleted' });
      } else {
        res
          .status(500)
          .json({ error: 'there was an error deleting the plant' });
      }
    } else {
      res
        .status(403)
        .json({ message: "you cannot delete another user's plant!" });
    }
  } catch (err) {
    res.status(500).json({ error: `error! ${err}` });
  }
});

// update a plant
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
