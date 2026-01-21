const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirect,
  handleGetAnalytics
} = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateNewShortURL);

// analytics FIRST
router.get('/analytics/:shortId', handleGetAnalytics);

// redirect LAST
router.get('/:shortId', handleRedirect);

module.exports = router;
