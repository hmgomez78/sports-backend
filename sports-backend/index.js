require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/health', (req, res) => res.json({ status: 'ok', ts: Date.now() }));

app.get('/api/v1/articles', (req, res) => {
  const sample = [
    { id: 1, title: 'Sample: Champions League drama', excerpt: 'Rangers crash out in playoffs.', tag: 'football', image: null, meta: 'UEFA - 2h' },
    { id: 2, title: 'Sample: Transfer bombshell', excerpt: 'Major transfer agreed.', tag: 'transfer', image: null, meta: 'The Athletic - 20m' }
  ];
  res.json({ source: 'placeholder', page: Number(req.query.page || 1), articles: sample });
});

app.get('/api/v1/promos', (req, res) => {
  res.json({
    source: 'placeholder',
    promos: [
      { id: 1, brand: 'Hollywood Bet', bonus: 'R1000', code: 'WELCOME100', country: 'ZA' },
      { id: 2, brand: '888', bonus: '€50', code: '888WEL', country: 'PT' }
    ]
  });
});

app.get('/api/v1/fixtures', (req, res) => {
  res.json({
    fixtures: [
      { id: 'f1', league: 'EPL', home: 'Liverpool', away: 'Man City', kickoff_utc: '2025-09-20T19:45:00Z' },
      { id: 'f2', league: 'LaLiga', home: 'Real Madrid', away: 'Barcelona', kickoff_utc: '2025-09-21T20:00:00Z' }
    ]
  });
});

app.get('/api/v1/predictions', (req, res) => {
  res.json({
    fixture_id: req.query.fixture_id || null,
    model_version: 'v0.1',
    home_prob: 0.45,
    draw_prob: 0.25,
    away_prob: 0.30,
    recommended_tip: 'Home win',
    edge_vs_market: 0.04
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'server_error' });
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
