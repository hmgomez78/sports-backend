const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/v1/translate?text=Hello&target=PT
router.get('/', async (req, res) => {
  try {
    const text = req.query.text || '';
    const target = (req.query.target || 'PT').toUpperCase();
    const key = process.env.DEEPL_KEY;
    if(!key) return res.status(500).json({ error: 'DEEPL_KEY not set' });

    const url = process.env.DEEPL_FREE ? 'https://api-free.deepl.com/v2/translate' : 'https://api.deepl.com/v2/translate';
    const params = new URLSearchParams();
    params.append('auth_key', key);
    params.append('text', text);
    params.append('target_lang', target);

    const r = await axios.post(url, params, { timeout: 10000 });
    // DeepL returns translations array
    const translations = (r.data && r.data.translations) ? r.data.translations.map(t => t.text) : [text];
    res.json({ source: 'deepl', translations });
  } catch (e) {
    console.error('translate error', e.message);
    res.status(500).json({ error: 'translate_error', message: e.message });
  }
});

module.exports = router;
