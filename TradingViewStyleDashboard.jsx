import React, { useState, useEffect } from 'react';
import './TradingViewStyleDashboard.css';

const TradingViewStyleDashboard = () => {
  // State for order book data
  const [orderBook, setOrderBook] = useState({
    bids: [
      [29990.0, 3.0],
      [29980.0, 2.5],
      [29970.0, 1.8],
      [29960.0, 2.2],
      [29950.0, 1.5],
    ],
    asks: [
      [30010.0, 2.0],
      [30020.0, 1.5],
      [30030.0, 3.2],
      [30040.0, 2.8],
      [30050.0, 1.2],
    ],
  });

  // State for BBO (Best Bid and Offer)
  const [bbo] = useState({
    bid: { price: 29990.0, quantity: 3.0 },
    ask: { price: 30010.0, quantity: 2.0 },
  });

  // State for recent trades
  const [recentTrades, setRecentTrades] = useState([
    {
      id: 'trade_123456',
      timestamp: '2024-06-01T12:00:01.000000Z',
      price: 30000.0,
      quantity: 0.5,
      side: 'buy',
    },
    {
      id: 'trade_123457',
      timestamp: '2024-06-01T12:00:02.000000Z',
      price: 30005.0,
      quantity: 1.2,
      side: 'sell',
    },
  ]);

  // State for order form
  const [orderForm, setOrderForm] = useState({
    symbol: 'BTC-USDT',
    orderType: 'limit',
    side: 'buy',
    quantity: '',
    price: '',
  });

  // Handle form input changes
  const handleChange = (field, value) => {
    setOrderForm((prev) => ({ ...prev, [field]: value }));
  };

  // Submit order handler
  const submitOrder = () => {
    if (!orderForm.quantity || (orderForm.orderType !== 'market' && !orderForm.price)) {
      alert('Please enter quantity and price (if applicable).');
      return;
    }
    alert(`Order submitted:\n${JSON.stringify(orderForm, null, 2)}`);
    setOrderForm((prev) => ({ ...prev, quantity: '', price: '' }));
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update order book quantities
      setOrderBook((prev) => {
        const bids = prev.bids.map(([price, qty]) => [
          price,
          Math.max(0, +(qty + (Math.random() - 0.5)).toFixed(2)),
        ]);
        const asks = prev.asks.map(([price, qty]) => [
          price,
          Math.max(0, +(qty + (Math.random() - 0.5)).toFixed(2)),
        ]);
        return { bids, asks };
      });

      // Randomly add trades
      if (Math.random() > 0.7) {
        const newTrade = {
          id: `trade_${Math.floor(Math.random() * 1000000)}`,
          timestamp: new Date().toISOString(),
          price: +(29900 + Math.random() * 200).toFixed(2),
          quantity: +(Math.random() * 2).toFixed(2),
          side: Math.random() > 0.5 ? 'buy' : 'sell',
        };
        setRecentTrades((prev) => [newTrade, ...prev.slice(0, 9)]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tradingview-dashboard">
      {/* TradingView-style Header */}
      <header className="tv-header">
        <div className="tv-header-left">
          <div className="tv-logo">T</div>
          <h1 className="tv-title">TradingView</h1>
          <div className="tv-separator">|</div>
          <h2 className="tv-subtitle">Crypto Matching Engine</h2>
        </div>
        <div className="tv-header-right">
          <div className="tv-live-indicator">
            <div className="tv-live-dot"></div>
            <span>LIVE</span>
          </div>
          <div className="tv-last-update">Last Update: {new Date().toLocaleTimeString()}</div>
        </div>
      </header>

      <div className="tv-container">
        {/* Left Sidebar - Trading Panel */}
        <aside className="tv-sidebar">
          {/* Symbol Info */}
          <div className="tv-symbol-info">
            <div className="tv-symbol-header">
              <h3>BTC/USDT</h3>
              <div className="tv-price-info">
                <div className="tv-price">$30,000.00</div>
                <div className="tv-price-change positive">+2.34% (+$687.45)</div>
              </div>
            </div>
            <div className="tv-symbol-stats">
              <div>
                <div className="tv-stat-label">24h High</div>
                <div className="tv-stat-value">$30,245.67</div>
              </div>
              <div>
                <div className="tv-stat-label">24h Low</div>
                <div className="tv-stat-value">$29,456.23</div>
              </div>
              <div>
                <div className="tv-stat-label">24h Vol</div>
                <div className="tv-stat-value">1.2M BTC</div>
              </div>
              <div>
                <div className="tv-stat-label">Market Cap</div>
                <div className="tv-stat-value">$587.2B</div>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="tv-order-form">
            <h4>Place Order</h4>
            <form onSubmit={(e) => { e.preventDefault(); submitOrder(); }} className="tv-form">
              <div className="tv-side-buttons">
                <button
                  type="button"
                  className={orderForm.side === 'buy' ? 'tv-btn-buy active' : 'tv-btn-buy'}
                  onClick={() => handleChange('side', 'buy')}
                >
                  Buy
                </button>
                <button
                  type="button"
                  className={orderForm.side === 'sell' ? 'tv-btn-sell active' : 'tv-btn-sell'}
                  onClick={() => handleChange('side', 'sell')}
                >
                  Sell
                </button>
              </div>

              <label>Order Type</label>
              <select
                value={orderForm.orderType}
                onChange={(e) => handleChange('orderType', e.target.value)}
              >
                <option value="limit">Limit</option>
                <option value="market">Market</option>
                <option value="stop">Stop</option>
              </select>

              <label>Quantity</label>
              <input
                type="number"
                placeholder="0.00"
                value={orderForm.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
              />

              {orderForm.orderType !== 'market' && (
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={orderForm.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                  />
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-2 rounded font-semibold text-sm transition-colors ${
                  orderForm.side === 'buy'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {orderForm.side === 'buy' ? 'Buy' : 'Sell'} {orderForm.symbol}
              </button>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="p-4">
            <h4 className="text-white font-semibold mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold transition-colors">
                View Chart
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded text-sm font-semibold transition-colors">
                Order History
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded text-sm font-semibold transition-colors">
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Symbol:</span>
                  <span className="text-white font-semibold">BTC/USDT</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Spread:</span>
                  <span className="text-white font-semibold">$20.00</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                  1m
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                  5m
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                  15m
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                  1h
                </button>
              </div>
            </div>
          </div>

          {/* Main Trading Area */}
          <div className="flex-1 grid grid-cols-3 gap-4 p-4">
            {/* Order Book */}
            <div className="bg-gray-800 rounded border border-gray-700">
              <div className="p-3 border-b border-gray-700">
                <h3 className="text-white font-semibold">Order Book</h3>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <div className="text-red-400 font-semibold mb-2 text-center">Asks</div>
                    {orderBook.asks.map(([price, qty], i) => (
                      <div key={i} className="flex justify-between py-1 hover:bg-gray-700 px-2 rounded">
                        <span className="text-red-400">{price.toLocaleString()}</span>
                        <span className="text-gray-300">{qty.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-green-400 font-semibold mb-2 text-center">Bids</div>
                    {orderBook.bids.map(([price, qty], i) => (
                      <div key={i} className="flex justify-between py-1 hover:bg-gray-700 px-2 rounded">
                        <span className="text-green-400">{price.toLocaleString()}</span>
                        <span className="text-gray-300">{qty.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-gray-800 rounded border border-gray-700 flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-2">Last Price</div>
                <div className="text-3xl font-bold text-white mb-2">$30,000.00</div>
                <div className="text-green-400 text-lg">+$687.45 (+2.34%)</div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-green-400 font-bold text-lg">{bbo.bid.price.toLocaleString()}</div>
                  <div className="text-gray-400 text-xs">Best Bid</div>
                </div>
                <div>
                  <div className="text-red-400 font-bold text-lg">{bbo.ask.price.toLocaleString()}</div>
                  <div className="text-gray-400 text-xs">Best Ask</div>
                </div>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-gray-800 rounded border border-gray-700">
              <div className="p-3 border-b border-gray-700">
                <h3 className="text-white font-semibold">Recent Trades</h3>
              </div>
              <div className="p-2 max-h-96 overflow-y-auto">
                <table className="w-full text-xs font-mono">
                  <thead className="sticky top-0 bg-gray-700">
                    <tr>
                      <th className="text-left p-2 text-gray-400">Time</th>
                      <th className="text-right p-2 text-gray-400">Price</th>
                      <th className="text-right p-2 text-gray-400">Amount</th>
                      <th className="text-center p-2 text-gray-400">Side</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrades.map(({ id, timestamp, price, quantity, side }) => (
                      <tr key={id} className="hover:bg-gray-700">
                        <td className="p-2 text-gray-300">{new Date(timestamp).toLocaleTimeString()}</td>
                        <td className={`p-2 text-right font-semibold ${side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                          {price.toLocaleString()}
                        </td>
                        <td className="p-2 text-right text-gray-300">{quantity.toFixed(4)}</td>
                        <td className="p-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            side === 'buy' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {side.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingViewStyleDashboard;
