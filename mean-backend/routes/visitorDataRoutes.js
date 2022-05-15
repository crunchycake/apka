const express = require('express');
const router = express.Router();
const visitorDataController = require('./../controllers/visitorDataControllers');

router.post('/', visitorDataController.createVisitorData);
router.get('/', visitorDataController.getAllVisitorsData);
router.get('/:jakasdata', visitorDataController.filterByDate);

module.exports = router;
