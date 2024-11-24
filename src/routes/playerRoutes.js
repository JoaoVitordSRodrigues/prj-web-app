const express = require('express')
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/players', playerController.listPlayers);

router.post('/player', playerController.addPlayer);

router.get('/player/:id', playerController.findPlayer);

router.put('/player/:id', playerController.updtPlayer);

router.delete('/player/:id', playerController.deletePlayer)

module.exports = router;