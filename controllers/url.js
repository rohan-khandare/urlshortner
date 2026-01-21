const URL = require('../models/url');
const shortid = require('shortid');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    const shortID = shortid.generate();  // ✅ correct

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.render("home", { id: shortID });
}

async function handleRedirect(req, res) {
    const shortID = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId: shortID },              // ✅ correct key
        {
            $push: {
                visitHistory: { timestamp: Date.now() }
            }
        },
        { new: true }                      // return updated document
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    return res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: "URL not found" });
    }

    return res.json({ analytics: result.visitHistory });
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirect,
    handleGetAnalytics
};
