const router = require('express').Router();
const appController = require('../controllers/clientController');

router.get('/', appController.getAllClients);
router.get('/:id', appController.getClientByID);
router.post('/', appController.addNewClient);
router.put('/:id', appController.editClient);
router.delete('/:id', appController.deleteClient);

module.exports = router;
