const express = require('express');
const { users, plants } = require('../data/dbHelpers');
const {
  protect,
  checkForValidUserId,
  checkUserAccess
} = require('../common/middleware');

const router = express.Router();

// get a list of all users
router.get('/', protect, async (req, res) => {
  try {
    const userList = await users.getUsers();
    res.status(200).json(userList);
  } catch (err) {
    res.status(500).json({ error: `error! ${err}` });
  }
});

// get a single user
router.get(
  '/:id',
  protect,
  checkForValidUserId,
  checkUserAccess,
  async (req, res) => {
    try {
      const user = await users.getUserById(req.params.id);
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      res
        .status(500)
        .json({ error: `there was an error accessing the db: ${err}` });
    }
  }
);

// update a single user
router.put(
  '/:id',
  protect,
  checkForValidUserId,
  checkUserAccess,
  async (req, res) => {
    try {
      const changes = req.body;
      if (!Object.keys(req.body).length) {
        res.status(400).json({ error: 'you did not submit any changes' });
      } else {
        const count = await users.updateUser(req.params.id, changes);
        if (count) {
          const updatedUser = await users.getUserById(req.params.id);
          delete updatedUser.password;
          res.status(200).json(updatedUser);
        }
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: `there was an error accessing the db: ${err}` });
    }
  }
);

// get all user's plants
router.get(
  '/:id/plants',
  protect,
  checkForValidUserId,
  checkUserAccess,
  async (req, res) => {
    try {
      const { id } = req.params;
      const plantList = await plants.getUserPlants(id);
      for (let i = 0; i < plantList.length; i++) {
        plantList[i].schedule = await plants.getWateringSchedule(
          plantList[i].id
        );
      }
      res.status(200).json(plantList);
    } catch (err) {
      res
        .status(500)
        .json({ error: `there was an error accessing the db: ${err}` });
    }
  }
);

// add a user plant
router.post(
  '/:id/plants',
  protect,
  checkForValidUserId,
  checkUserAccess,
  async (req, res) => {
    try {
      const { id } = req.params;
      const plant = req.body;
      if (!plant.name) {
        res.status(404).json({ error: 'Your plant must have a name' });
      } else {
        const [plantId] = await plants.addPlant(id, plant);
        const newPlant = await plants.getPlantById(plantId);
        res.status(200).json(newPlant);
      }
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  }
);

module.exports = router;
