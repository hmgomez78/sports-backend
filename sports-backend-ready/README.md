# Sports Backend (NewsAPI + Football-Data + DeepL)
This is a ready-to-deploy Node/Express backend that provides endpoints for news, fixtures and translations.

## Endpoints
- GET /health
- GET /api/v1/news?q=football&lang=en
- GET /api/v1/fixtures?competition=PL
- GET /api/v1/translate?text=Hello&target=PT

## Deploy
1. Copy `.env.example` to `.env` and fill your keys.
2. npm install
3. npm start
