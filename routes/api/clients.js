const express = require('express');
const router = express.Router();
const clientsCtrl = require('../../controllers/clients');

/*---------- Client Routes ----------*/

router.post('/addclient', clientsCtrl.addClient);
router.post('/minttoken', clientsCtrl.mintToken);
router.post('/checkpayment', clientsCtrl.checkPayment);








module.exports = router;