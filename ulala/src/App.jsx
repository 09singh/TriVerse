import React, { useState } from 'react';
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";
import CryptoPage from "./pages/CryptoPage";
import StockPage from "./pages/StockPage";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
  <div>
          {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
          {currentPage === 'weather' && <WeatherPage navigateTo={navigateTo} />}
          {currentPage === 'crypto' && <CryptoPage navigateTo={navigateTo} />}
          {currentPage === 'stock' && <StockPage navigateTo={navigateTo} />}
    </div>
  );
}

export default App;