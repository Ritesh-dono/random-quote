// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuoteCard from './component/QuoteCard';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      setQuote(response.data[0]);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const saveQuote = (quote) => {
    setSavedQuotes([...savedQuotes, quote]);
  };

  return (
    <div className="App">
      <h1> Quotes</h1>
      {quote && <QuoteCard quote={quote} onSave={saveQuote} />}
      <button onClick={fetchQuote}>Get Another Quote</button>
      <h2>Saved Quotes</h2>
      {savedQuotes.map((quote, index) => (
        <QuoteCard key={index} quote={quote} />
      ))}
    </div>
  );
}

export default App;
