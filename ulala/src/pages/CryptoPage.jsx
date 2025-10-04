import React, { useState, useEffect } from 'react';
import './crypto.css';
export default function CryptoPage({ navigateTo }) {
  const [crypto, setCrypto] = useState({ bitcoin: null, ethereum: null });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchCrypto = async () => {
    setLoading(true);
    try {
      const priceResponse = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true'
      );
      const priceData = await priceResponse.json();
      
      setCrypto({
        bitcoin: {
          name: 'Bitcoin',
          symbol: 'BTC',
          price: priceData?.bitcoin?.usd,
          change: priceData?.bitcoin?.usd_24h_change,
          marketCap: priceData?.bitcoin?.usd_market_cap,
          volume: priceData?.bitcoin?.usd_24h_vol
        },
        ethereum: {
          name: 'Ethereum',
          symbol: 'ETH',
          price: priceData?.ethereum?.usd,
          change: priceData?.ethereum?.usd_24h_change,
          marketCap: priceData?.ethereum?.usd_market_cap,
          volume: priceData?.ethereum?.usd_24h_vol
        }
      });

      const chartResponse = await fetch(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7'
      );
      const chartJson = await chartResponse.json();
      
      const formatted = chartJson?.prices?.map((item, index) => ({
        time: new Date(item[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: parseFloat(item[1]?.toFixed(2))
      })) || [];
      
      setChartData(formatted);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Crypto fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrypto();
    const interval = setInterval(fetchCrypto, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num?.toLocaleString()}`;
  };

  const getMaxPrice = () => Math.max(...chartData.map(d => d.price));
  const getMinPrice = () => Math.min(...chartData.map(d => d.price));

  return (
    <>

      <div className="crypto-container">
        <div className="crypto-content">
          <button onClick={() => navigateTo && navigateTo('home')} className="back-button">
            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          <div className="header">
            <h1>Cryptocurrency Dashboard</h1>
            <p>Real-time crypto prices and market trends</p>
            <div className="live-indicator">
              <span className="live-dot"></span>
              <span>Live Data • Updated {lastUpdate.toLocaleTimeString()}</span>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Loading live crypto data...</p>
            </div>
          ) : (
            <>
              <div className="crypto-grid">
                {/* Bitcoin Card */}
                <div className="crypto-card bitcoin-card">
                  <div className="card-header">
                    <div className="coin-info">
                      <div className="coin-icon bitcoin-icon">₿</div>
                      <div>
                        <p className="coin-name">{crypto?.bitcoin?.name}</p>
                        <p className="coin-symbol">{crypto?.bitcoin?.symbol}</p>
                      </div>
                    </div>
                    <div className={`change-badge ${crypto?.bitcoin?.change >= 0 ? 'positive' : 'negative'}`}>
                      {crypto?.bitcoin?.change >= 0 ? '▲' : '▼'}
                      {Math.abs(crypto?.bitcoin?.change)?.toFixed(2)}%
                    </div>
                  </div>
                  <div className="price-display">
                    ${crypto?.bitcoin?.price?.toLocaleString()}
                  </div>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <p className="stat-label">Market Cap</p>
                      <p className="stat-value">{formatNumber(crypto?.bitcoin?.marketCap)}</p>
                    </div>
                    <div className="stat-item">
                      <p className="stat-label">24h Volume</p>
                      <p className="stat-value">{formatNumber(crypto?.bitcoin?.volume)}</p>
                    </div>
                  </div>
                </div>

                {/* Ethereum Card */}
                <div className="crypto-card ethereum-card">
                  <div className="card-header">
                    <div className="coin-info">
                      <div className="coin-icon ethereum-icon">Ξ</div>
                      <div>
                        <p className="coin-name">{crypto?.ethereum?.name}</p>
                        <p className="coin-symbol">{crypto?.ethereum?.symbol}</p>
                      </div>
                    </div>
                    <div className={`change-badge ${crypto?.ethereum?.change >= 0 ? 'positive' : 'negative'}`}>
                      {crypto?.ethereum?.change >= 0 ? '▲' : '▼'}
                      {Math.abs(crypto?.ethereum?.change)?.toFixed(2)}%
                    </div>
                  </div>
                  <div className="price-display">
                    ${crypto?.ethereum?.price?.toLocaleString()}
                  </div>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <p className="stat-label">Market Cap</p>
                      <p className="stat-value">{formatNumber(crypto?.ethereum?.marketCap)}</p>
                    </div>
                    <div className="stat-item">
                      <p className="stat-label">24h Volume</p>
                      <p className="stat-value">{formatNumber(crypto?.ethereum?.volume)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              {chartData.length > 0 && (
                <div className="chart-container">
                  <div className="chart-header">
                    <h3 className="chart-title">Bitcoin - 7 Day Price Chart</h3>
                    <div className="chart-stats">
                      <div className="chart-stat">
                        <p className="chart-stat-label">High</p>
                        <p className="chart-stat-value">${getMaxPrice().toLocaleString()}</p>
                      </div>
                      <div className="chart-stat">
                        <p className="chart-stat-label">Low</p>
                        <p className="chart-stat-value low">${getMinPrice().toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <svg className="chart-svg" viewBox="0 0 800 300" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffa500" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#ffa500" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line 
                        key={i}
                        x1="0" 
                        y1={i * 60} 
                        x2="800" 
                        y2={i * 60} 
                        className="chart-grid-line"
                      />
                    ))}
                    
                    {/* Chart path */}
                    {(() => {
                      const maxPrice = Math.max(...chartData.map(d => d.price));
                      const minPrice = Math.min(...chartData.map(d => d.price));
                      const range = maxPrice - minPrice;
                      const padding = 20;
                      
                      const points = chartData.map((d, i) => {
                        const x = (i / (chartData.length - 1)) * 800;
                        const y = 280 - (((d.price - minPrice) / range) * (280 - padding));
                        return `${x},${y}`;
                      }).join(' ');
                      
                      const areaPoints = `0,280 ${points} 800,280`;
                      
                      return (
                        <>
                          <polyline points={areaPoints} className="chart-area" />
                          <polyline points={points} className="chart-line" />
                          {chartData.map((d, i) => {
                            const x = (i / (chartData.length - 1)) * 800;
                            const y = 280 - (((d.price - minPrice) / range) * (280 - padding));
                            return (
                              <circle key={i} cx={x} cy={y} r="4" className="chart-dot" />
                            );
                          })}
                        </>
                      );
                    })()}
                  </svg>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}