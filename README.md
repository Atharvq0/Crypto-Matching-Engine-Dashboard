# TradingView Style Crypto Matching Engine Dashboard

## Overview
This project is a React-based dashboard inspired by TradingView, designed for a crypto matching engine. It provides a real-time interface to view order book data, recent trades, and place buy/sell orders with various order types.

## Features
- Real-time order book display with bids and asks
- Recent trades list with timestamps, prices, quantities, and sides
- Order form to place buy or sell orders with limit, market, and stop types
- Quick action buttons for chart viewing, order history, and settings
- Dynamic updates simulating live market data
- Responsive and styled with Tailwind CSS and custom CSS

## Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3001`

## Usage
- Use the sidebar to view symbol info and place orders.
- Select order type, side (buy/sell), quantity, and price (if applicable).
- Click the Buy or Sell button to submit an order.
- View the order book and recent trades updating in real-time.
- Use quick action buttons for additional features (placeholders).

## Main Components
- **TradingViewStyleDashboard.jsx**: Main React component managing state and rendering the dashboard UI.
- **Order Book**: Displays current bids and asks with prices and quantities.
- **Recent Trades**: Shows a list of recent trades with details.
- **Order Form**: Allows users to place orders with validation.
- **Quick Actions**: Buttons for additional features (currently placeholders).

## Development
- The project uses React functional components and hooks.
- Styling is done with Tailwind CSS and custom CSS.
- Real-time updates are simulated with `setInterval` in `useEffect`.
- The project can be extended to connect to real backend APIs for live data.

## Testing
- Critical-path testing includes verifying UI rendering, order form functionality, and dynamic updates.
- Further thorough testing can be done by interacting with all UI elements and edge cases.

## License
This project is provided as-is for demonstration purposes. Please add your own licensing terms as needed.

## Contact
For questions or contributions, please contact the project maintainer.

---
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

