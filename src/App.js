import { useState, useEffect } from 'react';
import './App.css';
import AllJobs from './components/AllJobs/AllJobs';
import data from './data.json';

function App() {

  return (
    <div className="App">
      <header className="App-header" />
      <main>
        <AllJobs allJobs={data} />
      </main>
    </div>
  );
}

export default App;
