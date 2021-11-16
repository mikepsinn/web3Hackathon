const express = require('express');
const router = express.Router();
const clientsCtrl = require('../../controllers/clients');

/*---------- Client Routes ----------*/

router.post('/addclient', clientsCtrl.addClient);








module.exports = router;