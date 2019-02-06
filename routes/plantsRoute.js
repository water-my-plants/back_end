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
    if (!plant) {
      res.status(400).json({ error: 'there is no plant with that id' });
    } else {
      res.json(plant);
    }
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
    if (!plant) {
      res.status(400).json({ error: 'there is no plant with that id' });
      return;
    }
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

// add a watering time
// expects an array of times
// should return the updated schedule
router.post('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const times = [...req.body.times];
    // times.forEach(async time => await plants.addWatering(id, time));
    for (let i = 0; i < times.length; i++) {
      const testArr = await plants.addWatering(id, times[i]);
    }

    const schedule = await plants.getWateringSchedule(id);
    // schedule = schedule.map(time => time.watering_time);
    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json(err);
  }
});

// returns a plant's watering schedule
router.get('/:id/schedule', protect, async (req, res) => {
  try {
    const schedule = await plants.getWateringSchedule(req.params.id);
    if (schedule.length) {
      // schedule = schedule.map(time => time.watering_time);
      res.status(200).json(schedule);
    } else {
      res.status(400).json({
        error:
          'there is no schedule. ensure you have a valid id and the plant has a schedule'
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: `there was an error accessing the db: ${err}` });
  }
});

// deletes plant's entire watering schedule
router.delete('/:id/schedule', protect, async (req, res) => {
  try {
    const response = await plants.deleteWateringSchedule(req.params.id);
    console.log(response);
    res.status(200).json({ message: 'the schedule was deleted' });
  } catch (err) {
    res
      .status(500)
      .json({ error: `there was an error deleting the schedule: ${err}` });
  }
});

// delete a specific watering time
// returns the modified watering schedule
router.delete('/:plantId/schedule/:waterId', async (req, res) => {
  try {
    const count = await plants.deleteWateringTime(req.params.waterId);
    if (count) {
      const schedule = await plants.getWateringSchedule(req.params.plantId);
      res.status(200).json(schedule);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: `there was an error deleting the watering time: ${err}` });
  }
});

module.exports = router;
