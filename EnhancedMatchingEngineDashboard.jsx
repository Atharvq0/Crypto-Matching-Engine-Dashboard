import React, { useState, useEffect } from 'react';

const EnhancedMatchingEngineDashboard = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-6 font-sans">
        {/* Enhanced Header */}
        <header className="mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              🚀 Crypto Matching Engine
            </h1>
            <p className="text-xl text-gray-300 mb-6">Fast, fair, and reliable order matching</p>
            <div className="flex justify-center items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">Live Trading</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <span className="text-blue-400 font-semibold">Real-time Updates</span>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced BBO Section */}
        <section className="flex justify-center gap-8 mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-center shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20">
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-300 rounded-full animate-ping"></div>
              <h2 className="text-2xl font-bold text-white mb-3">📈 Best Bid</h2>
              <p className="text-5xl font-extrabold text-white mb-2">${bbo.bid.price.toLocaleString()}</p>
              <p className="text-green-100 font-semibold text-lg">Qty: {bbo.bid.quantity}</p>
              <div className="mt-4 flex justify-center">
                <div className="bg-green-400/30 px-3 py-1 rounded-full">
                  <span className="text-green-200 text-sm font-medium">+2.3%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-8 text-center shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20">
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-300 rounded-full animate-ping"></div>
              <h2 className="text-2xl font-bold text-white mb-3">📉 Best Ask</h2>
              <p className="text-5xl font-extrabold text-white mb-2">${bbo.ask.price.toLocaleString()}</p>
              <p className="text-red-100 font-semibold text-lg">Qty: {bbo.ask.quantity}</p>
              <div className="mt-4 flex justify-center">
                <div className="bg-red-400/30 px-3 py-1 rounded-full">
                  <span className="text-red-200 text-sm font-medium">-1.8%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Order Form */}
        <section className="relative mb-12 max-w-2xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-75"></div>
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ⚡ Place New Order
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitOrder();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Symbol</label>
                  <select
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    value={orderForm.symbol}
                    onChange={(e) => handleChange('symbol', e.target.value)}
                  >
                    <option value="BTC-USDT" className="bg-slate-800">BTC-USDT</option>
                    <option value="ETH-USDT" className="bg-slate-800">ETH-USDT</option>
                    <option value="SOL-USDT" className="bg-slate-800">SOL-USDT</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Side</label>
                  <select
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    value={orderForm.side}
                    onChange={(e) => handleChange('side', e.target.value)}
                  >
                    <option value="buy" className="bg-slate-800">📈 Buy</option>
                    <option value="sell" className="bg-slate-800">📉 Sell</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-300">Order Type</label>
                <select
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  value={orderForm.orderType}
                  onChange={(e) => handleChange('orderType', e.target.value)}
                >
                  <option value="limit" className="bg-slate-800">Limit</option>
                  <option value="market" className="bg-slate-800">Market</option>
                  <option value="ioc" className="bg-slate-800">IOC</option>
                  <option value="fok" className="bg-slate-800">FOK</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Quantity</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter quantity"
                    value={orderForm.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    required
                  />
                </div>

                {orderForm.orderType !== 'market' && (
                  <div>
                    <label className="block mb-2 font-semibold text-gray-300">Price</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter price"
                      value={orderForm.price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🚀 Submit Order
              </button>
            </form>
          </div>
        </section>

        {/* Enhanced Order Book & Trades */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Order Book */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-75"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                📊 Order Book (Top 5)
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-red-400 font-bold mb-4 text-center text-lg">🔻 Asks</h3>
                  <div className="space-y-2">
                    {orderBook.asks.map(([price, qty], i) => (
                      <div key={i} className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 hover:bg-red-500/30 transition-all duration-300">
                        <div className="flex justify-between items-center">
                          <span className="text-red-300 font-mono text-lg">${price.toLocaleString()}</span>
                          <span className="text-red-200 font-semibold">{qty.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-green-400 font-bold mb-4 text-center text-lg">🔺 Bids</h3>
                  <div className="space-y-2">
                    {orderBook.bids.map(([price, qty], i) => (
                      <div key={i} className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 hover:bg-green-500/30 transition-all duration-300">
                        <div className="flex justify-between items-center">
                          <span className="text-green-300 font-mono text-lg">${price.toLocaleString()}</span>
                          <span className="text-green-200 font-semibold">{qty.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Recent Trades */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl blur opacity-75"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                📈 Recent Trades
              </h2>
              <div className="overflow-auto max-h-96">
                <table className="w-full">
                  <thead className="sticky top-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg">
                    <tr>
                      <th className="px-4 py-3 text-left text-yellow-300 font-bold">Time</th>
                      <th className="px-4 py-3 text-left text-yellow-300 font-bold">Price</th>
                      <th className="px-4 py-3 text-left text-yellow-300 font-bold">Qty</th>
                      <th className="px-4 py-3 text-left text-yellow-300 font-bold">Side</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrades.map(({ id, timestamp, price, quantity, side }) => (
                      <tr key={id} className="border-b border-white/10 hover:bg-white/5 transition-all duration-300">
                        <td className="px-4 py-3 text-gray-300 text-sm">{new Date(timestamp).toLocaleTimeString()}</td>
                        <td className={`px-4 py-3 font-bold text-lg ${side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                          ${price.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-gray-300">{quantity.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              side === 'buy'
                                ? 'bg-green-500/30 text-green-300 border border-green-500/50'
                                : 'bg-red-500/30 text-red-300 border border-red-500/50'
                            }`}
                          >
                            {side.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {recentTrades.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-gray-400">
                          No trades yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="mt-16 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <p className="text-gray-400 text-lg">
              &copy; 2024 <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold">Crypto Matching Engine Demo</span>
            </p>
            <div className="flex justify-center items-center mt-4 space-x-6 text-sm text-gray-500">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Real-time Data</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <span>Secure Trading</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></div>
                <span>24/7 Support</span>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EnhancedMatchingEngineDashboard;
