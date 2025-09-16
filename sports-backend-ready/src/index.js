require('dotenv').config();
const express = require('express');
const cors = require('cors');
const newsRouter = require('./routes/news');
const footballRouter = require('./routes/football');
const translateRouter = require('./routes/translate');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req,res) => res.json({status:'ok', ts: Date.now()}));

app.use('/api/v1/news', newsRouter);
app.use('/api/v1/fixtures', footballRouter);
app.use('/api/v1/translate', translateRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Sports backend running on port ${PORT}`));
