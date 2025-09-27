from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import uvicorn

app = FastAPI()

# Allow CORS for frontend localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Order(BaseModel):
    symbol: str
    order_type: str
    side: str
    quantity: float
    price: float = None

class Trade(BaseModel):
    id: str
    timestamp: str
    price: float
    quantity: float
    side: str

order_book = {
    "bids": [
        [29990.0, 3.0],
        [29980.0, 2.5],
        [29970.0, 1.8],
        [29960.0, 2.2],
        [29950.0, 1.5],
    ],
    "asks": [
        [30010.0, 2.0],
        [30020.0, 1.5],
        [30030.0, 3.2],
        [30040.0, 2.8],
        [30050.0, 1.2],
    ],
}

recent_trades: List[Trade] = [
    Trade(id="trade_123456", timestamp="2024-06-01T12:00:01.000000Z", price=30000.0, quantity=0.5, side="buy"),
    Trade(id="trade_123457", timestamp="2024-06-01T12:00:02.000000Z", price=30005.0, quantity=1.2, side="sell"),
]

@app.get("/orderbook")
def get_order_book():
    return order_book

@app.get("/trades")
def get_recent_trades():
    return recent_trades

@app.post("/order")
def place_order(order: Order):
    # For demo, just append a trade and return success
    trade_id = f"trade_{len(recent_trades) + 1}"
    timestamp = datetime.utcnow().isoformat() + "Z"
    trade = Trade(
        id=trade_id,
        timestamp=timestamp,
        price=order.price if order.price else 0.0,
        quantity=order.quantity,
        side=order.side,
    )
    recent_trades.insert(0, trade)
    if len(recent_trades) > 10:
        recent_trades.pop()
    return {"status": "success", "trade": trade}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
