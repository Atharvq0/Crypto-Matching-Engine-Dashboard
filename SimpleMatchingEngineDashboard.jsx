import React, { useState, useEffect } from 'react';

const SimpleMatchingEngineDashboard = () => {
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
  const [bbo, setBbo] = useState({
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
    <div className="max-w-5xl mx-auto p-6 font-sans text-gray-900">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-1">Crypto Matching Engine</h1>
        <p className="text-gray-600">Fast, fair, and reliable order matching</p>
      </header>

      {/* BBO Section */}
      <section className="flex justify-center gap-12 mb-10">
        <div className="bg-green-100 rounded-lg p-6 w-48 text-center shadow">
          <h2 className="text-lg font-semibold text-green-700 mb-1">Best Bid</h2>
          <p className="text-3xl font-bold">${bbo.bid.price.toLocaleString()}</p>
          <p className="text-green-800 font-medium">Qty: {bbo.bid.quantity}</p>
        </div>
        <div className="bg-red-100 rounded-lg p-6 w-48 text-center shadow">
          <h2 className="text-lg font-semibold text-red-700 mb-1">Best Ask</h2>
          <p className="text-3xl font-bold">${bbo.ask.price.toLocaleString()}</p>
          <p className="text-red-800 font-medium">Qty: {bbo.ask.quantity}</p>
        </div>
      </section>

      {/* Order Form */}
      <section className="bg-gray-50 rounded-lg p-6 shadow max-w-md mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Place New Order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitOrder();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">Symbol</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={orderForm.symbol}
              onChange={(e) => handleChange('symbol', e.target.value)}
            >
              <option>BTC-USDT</option>
              <option>ETH-USDT</option>
              <option>SOL-USDT</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Order Type</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={orderForm.orderType}
                onChange={(e) => handleChange('orderType', e.target.value)}
              >
                <option value="limit">Limit</option>
                <option value="market">Market</option>
                <option value="ioc">IOC</option>
                <option value="fok">FOK</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Side</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={orderForm.side}
                onChange={(e) => handleChange('side', e.target.value)}
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              min="0"
              step="any"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter quantity"
              value={orderForm.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              required
            />
          </div>

          {orderForm.orderType !== 'market' && (
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                min="0"
                step="any"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter price"
                value={orderForm.price}
                onChange={(e) => handleChange('price', e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
          >
            Submit Order
          </button>
        </form>
      </section>

      {/* Order Book & Trades */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Order Book */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Order Book (Top 5)</h2>
          <div className="flex justify-around text-center font-mono text-sm">
            <div className="w-1/2">
              <h3 className="text-red-600 font-semibold mb-2">Asks</h3>
              <div className="space-y-1">
                {orderBook.asks.map(([price, qty], i) => (
                  <div key={i} className="flex justify-between px-4 py-1 border-b border-gray-200 text-red-600">
                    <span>{price.toLocaleString()}</span>
                    <span>{qty.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2">
              <h3 className="text-green-600 font-semibold mb-2">Bids</h3>
              <div className="space-y-1">
                {orderBook.bids.map(([price, qty], i) => (
                  <div key={i} className="flex justify-between px-4 py-1 border-b border-gray-200 text-green-600">
                    <span>{price.toLocaleString()}</span>
                    <span>{qty.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trades */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Recent Trades</h2>
          <div className="overflow-auto max-h-72 border border-gray-200 rounded">
            <table className="w-full text-left text-sm font-mono">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-3 py-2">Time</th>
                  <th className="px-3 py-2">Price</th>
                  <th className="px-3 py-2">Qty</th>
                  <th className="px-3 py-2">Side</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.map(({ id, timestamp, price, quantity, side }) => (
                  <tr key={id} className="border-b border-gray-100">
                    <td className="px-3 py-1 text-gray-600">{new Date(timestamp).toLocaleTimeString()}</td>
                    <td className={`px-3 py-1 font-semibold ${side === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                      ${price.toLocaleString()}
                    </td>
                    <td className="px-3 py-1">{quantity.toFixed(2)}</td>
                    <td className="px-3 py-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          side === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {side.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentTrades.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-400">
                      No trades yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        &copy; 2024 Crypto Matching Engine Demo
      </footer>
    </div>
  );
};

export default SimpleMatchingEngineDashboard;