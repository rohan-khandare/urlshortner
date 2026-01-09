const express = require("express")

const {handleGenerateNewShortURL,handleRedirect,handleGetAnalytics} = require('../controllers/url')

const router = express.Router();

router.post('/',handleGenerateNewShortURL)

router.get('/:id', handleRedirect)

router.get('/analytics/:shortId',handleGetAnalytics)

module.exports = router;