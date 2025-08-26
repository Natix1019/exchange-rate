# NBU Currency Rates SPA

Simple SPA on Vue 3 (Vite) for viewing NBU exchange rates with local editing.

## Run
```bash
# optional: copy env and adjust
cp .env.example .env  # or create .env with VITE_NBU_API_BASE

npm install
npm run dev
```
If you see a Node.js warning, use Node 20.19+ or 22.12+.

## Pages
- Home: today rates
- Search: pick a date and load
- Changed: list of locally edited rates
- Edit: edit rate and save to localStorage

## Tech
- Vue 3, Vite, Pinia, Vue Router

## Env
- `VITE_NBU_API_BASE` (default `https://bank.gov.ua`)
- `VITE_NBU_RATES_PATH` (default `/NBUStatService/v1/statdirectory/exchange`)
- `VITE_NBU_DATE_PARAM` (default `date`)
