import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './homepage.css';
export default 
function HomePage({ navigateTo }) {
  const cards = [
    {
      id: 'weather',
      title: 'Weather',
      description: 'Check live weather conditions',
      icon: '🌤️',
      page: 'weather'
    },
    {
      id: 'crypto',
      title: 'Cryptocurrency',
      description: 'check live crypto',
      icon: '₿',
      gradient: '',
      page: 'crypto'
    },
    {
      id: 'stock',
      title: 'Stock Market',
      description: 'Monitor stock prices & trends',
      icon: '📈',
      page: 'stock'
    }
  ];

  return (
    <div className="homepage-container ">
      <div className="homepage-container ">
        {/* Header */}
        <div className="homepage-header">
          <h1 className="omepage-header h1">
            Financial Dashboard
          </h1>
          <p className="homepage-header p">
            Real-time data at your fingertips
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="cards-grid">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => navigateTo(card.page)}
              className="card"
            >
              {/* Gradient Background */}
              <div className=" ##"></div>
              
              {/* Content */}
              <div className="card-content">
                <div className="card-icon">{card.icon}</div>
                <h2 className="card-content h2">
                  {card.title}
                </h2>
                <p className="card-content p ">
                  {card.description}
                </p>
                <div className="card-content  ">
                  <span>View Dashboard</span>
                  <div className="view-btn">
                    <icon>⏭️</icon>
                 
                  </div>
                </div>
              </div>
            </button> 
          ))}
        </div>

        {/* Footer */}
        <div className="homepage-footer">
          <p>Powered by SKS creation</p>
        </div>
      </div>
    </div>
  );
}