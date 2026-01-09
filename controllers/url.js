const URL = require('../models/url');
const shortid = require('shortid');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    // const { nanoid } = await import('nanoid');   // ✅ FIX
    const shortID = shortid(8);

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID });
}

async function handleRedirect(req, res) {
    const shortID = req.params.shortId ; 

    const entry = await URL.findOneAndUpdate(
       {shortID},
       { 
            $push : {
                visitHistory :{ timestamp : Date.now() }
            }   
       }
    )

    return res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result  = await URL.findOne({shortId});
    return res.json({analytics : result.visitHistory});
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirect,
    handleGetAnalytics
};
