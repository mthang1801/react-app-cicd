import { useState } from 'react';
import './App.css';
import logo from './logo.svg';

function App() {
	const [curDate, setCurDate] = useState(new Date().toLocaleString("vi"))
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
		<h3>Timestamp : {curDate}</h3>
		<button onClick={() => setCurDate(new Date().toLocaleString("vi"))}>Click here to refresh time</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
