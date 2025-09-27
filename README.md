# Backend for Crypto Matching Engine Dashboard

## Overview
This backend service is built with FastAPI to support the Crypto Matching Engine Dashboard frontend. It provides REST API endpoints for order book data, recent trades, and order submission.

## Features
- Provides current order book data (bids and asks)
- Provides recent trades data
- Accepts new orders and simulates trade creation
- CORS enabled for frontend integration

## Installation
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Backend
Start the FastAPI server with:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`.

## API Endpoints
- `GET /orderbook` - Returns the current order book data.
- `GET /trades` - Returns recent trades.
- `POST /order` - Submit a new order. Expects JSON body with:
  - `symbol`: string
  - `order_type`: string (e.g., "limit", "market")
  - `side`: string ("buy" or "sell")
  - `quantity`: float
  - `price`: float (optional for market orders)

## Integration with Frontend
The frontend React app can fetch data from this backend and submit orders via these endpoints. CORS is enabled for `http://localhost:3001` where the frontend runs.

## Notes
- This backend is a simple simulation and does not implement a real matching engine.
- Extend and customize as needed for production use.

## License
Add your license information here.

---
