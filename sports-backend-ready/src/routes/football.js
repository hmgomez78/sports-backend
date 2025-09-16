const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/v1/fixtures?competition=PL
router.get('/', async (req, res) => {
  try {
    const competition = (req.query.competition || 'PL').toUpperCase();
    // prefer API_FOOTBALL (api-sports) if API_FOOTBALL_KEY present
    if(process.env.API_FOOTBALL_KEY) {
      const url = 'https://v3.football.api-sports.io/fixtures';
      const params = { league: competition === 'PL' ? 39 : undefined, season: new Date().getFullYear() };
      const headers = { 'x-apisports-key': process.env.API_FOOTBALL_KEY };
      const r = await axios.get(url, { params, headers, timeout: 10000 });
      // keep it simple: return raw response
      return res.json({ source: 'api-football', data: r.data });
    }

    // fallback to football-data.org
    const key = process.env.FOOTBALL_DATA_KEY;
    if(!key) return res.status(500).json({ error: 'FOOTBALL_DATA_KEY not set' });
    const url = `https://api.football-data.org/v4/competitions/${competition}/matches`;
    const headers = { 'X-Auth-Token': key };
    const r = await axios.get(url, { headers, timeout: 10000 });
    const matches = (r.data.matches || []).map(m => ({
      id: m.id,
      utcDate: m.utcDate,
      homeTeam: m.homeTeam && m.homeTeam.name,
      awayTeam: m.awayTeam && m.awayTeam.name,
      status: m.status
    }));
    res.json({ source: 'football-data', count: matches.length, matches });
  } catch (e) {
    console.error('football error', e.message);
    res.status(500).json({ error: 'football_fetch_error', message: e.message });
  }
});

module.exports = router;
