const express = require('express');
const { plants, notifications } = require('../data/dbHelpers');
const {
  protect,
  checkForPlantOwner,
  checkForValidPlantId
} = require('../common/middleware');
const { notifier } = require('../twilio/cron');

const router = express.Router();

// get all plants
router.get('/', async (req, res) => {
  try {
    const plantList = await plants.getAllPlants();
    res.status(200).json(plantList);
  } catch (err) {
    res
      .status(500)
      .json({ error: `there was an error accessing the database: ${err}` });
  }
});

// get a plant
router.get(
  '/:id',
  protect,
  checkForValidPlantId,
  checkForPlantOwner,
  async (req, res) => {
    try {
      const { id } = req.params;
      const plant = await plants.getPlantById(id);
      // if (!plant) {
      //   res.status(400).json({ error: 'there is no plant with that id' });
      // } else {
      res.json(plant);
      // }
    } catch (err) {
      res.status(500).json({ error: `oh no!!! ${err}` });
    }
  }
);

// delete a plant
router.delete(
  '/:id',
  protect,
  checkForValidPlantId,
  checkForPlantOwner,
  async (req, res) => {
    try {
      const { id } = req.params;
      const count = await plants.deletePlantById(id);
      if (count) {
        res.status(200).json({ message: 'plant deleted' });
      } else {
        res
          .status(500)
          .json({ error: 'there was an error deleting the plant' });
      }
    } catch (err) {
      res.status(500).json({ error: `error! ${err}` });
    }
  }
);

// update a plant
router.put(
  '/:id',
  protect,
  checkForValidPlantId,
  checkForPlantOwner,
  async (req, res) => {
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
  }
);

// add a watering time
// expects an array of times
// returns the updated schedule
router.post(
  '/:id',
  protect,
  checkForValidPlantId,
  checkForPlantOwner,
  async (req, res) => {
    try {
      const { id } = req.params;
      const times = [...req.body.times];
      for (let i = 0; i < times.length; i++) {
        const [wateringId] = await plants.addWatering(id, times[i]);

        // if we add a notification boolean to plant, this could be an if statement
        const [notification] = await notifications.addNotification(wateringId);
        notifier(notification);
        // send notification to cron. cron uses date and sends uName, pName, phone # to send_sms
      }

      const schedule = await plants.getWateringSchedule(id);
      res.status(200).json(schedule);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// returns a plant's watering schedule
router.get(
  '/:id/schedule',
  protect,
  checkForValidPlantId,
  checkForPlantOwner,
  async (req, res) => {
    try {
      const schedule = await plants.getWateringSchedule(req.params.id);
      if (schedule.length) {
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
  }
);

// deletes plant's entire watering schedule
router.delete(
  '/:id/schedule',
  protect,
  checkForValidPlantId,
  checkForPlantOwner,
  async (req, res) => {
    try {
      const response = await plants.deleteWateringSchedule(req.params.id);
      console.log(response);
      res.status(200).json({ message: 'the schedule was deleted' });
    } catch (err) {
      res
        .status(500)
        .json({ error: `there was an error deleting the schedule: ${err}` });
    }
  }
);

// delete a specific watering time
// returns the modified watering schedule
router.delete(
  '/:id/schedule/:waterId',
  protect,
  checkForValidPlantId,
  checkForPlantOwner,
  async (req, res) => {
    try {
      const count = await plants.deleteWateringTime(req.params.waterId);
      if (count) {
        const schedule = await plants.getWateringSchedule(req.params.id);
        res.status(200).json(schedule);
      }
    } catch (err) {
      res.status(500).json({
        error: `there was an error deleting the watering time: ${err}`
      });
    }
  }
);

module.exports = router;
