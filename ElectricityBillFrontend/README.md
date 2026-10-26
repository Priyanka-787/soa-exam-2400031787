# Electricity Bill Manager – Frontend (React + Vite)

CrudServiceProject (Spring Boot, port 8081) ki frontend.

## Run cheyyadam
1. Mundu backend start cheyyandi (PostgreSQL + Spring Boot `localhost:8081`).
2. Ee folder lo:
   ```bash
   npm install
   npm run dev
   ```
3. Browser lo http://localhost:5173 open cheyyandi.

Dev mode lo Vite proxy `/Add`, `/DisplayAll`, `/Delete` ni `localhost:8081` ki pampistundi, so CORS setup avasaram ledu.

## Production build
```bash
VITE_API_URL=http://localhost:8081 npm run build
```
Ee case lo `backend-extra/CorsConfig.java` ni backend lo add cheyyandi.

## Features
- Bills list (DisplayAll), Add (POST /Add), Delete (DELETE /Delete/{id})
- Search by name/month, Paid/Unpaid filter
- Total / Paid / Pending summary cards
- Dark mode support, responsive layout
