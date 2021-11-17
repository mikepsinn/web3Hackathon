const express = require('express');
const router = express.Router();
const trialsCtrl = require('../../controllers/trials');

/*---------- Client Routes ----------*/

router.get('/gettrials', trialsCtrl.getTrials)
router.get('/findclients/:id', trialsCtrl.findClients)
router.post('/addtrial', trialsCtrl.addTrial);








module.exports = router;