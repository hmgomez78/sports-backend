const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/v1/news?q=football&lang=en
router.get('/', async (req, res) => {
  try {
    const q = req.query.q || 'football';
    const lang = (req.query.lang || 'en').substring(0,2);
    const key = process.env.NEWSAPI_KEY;
    if(!key) return res.status(500).json({ error: 'NEWSAPI_KEY not set' });

    const url = `https://newsapi.org/v2/everything`;
    const params = { q, language: lang, pageSize: 20 };
    const headers = { 'Authorization': key };
    const r = await axios.get(url, { params, headers, timeout: 10000 });
    // Normalize response: return articles array with required fields
    const articles = (r.data.articles || []).map((a, i) => ({
      id: a.url || `news-${i}`,
      title: a.title,
      excerpt: a.description || '',
      url: a.url,
      image: a.urlToImage || null,
      publishedAt: a.publishedAt,
      source: a.source && a.source.name
    }));
    res.json({ source: 'newsapi', count: articles.length, articles });
  } catch (e) {
    console.error('news error', e.message);
    res.status(500).json({ error: 'news_fetch_error', message: e.message });
  }
});

module.exports = router;
