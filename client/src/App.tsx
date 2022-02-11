import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface test {
  basis: number;
  francium: string;
  tulip: string;
}

function App() {
  const [apy, setAPY] = useState<Partial<test>>({});

  useEffect(() => {
    updateTing();
  }, []);

  const updateTing = () => {
    setInterval(() => {
      fetch("http://localhost:4000/basis")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAPY(data);
          console.log(apy);
        });
      //  setPostArray([{name: 'a'}, {name: 'b'},{name: 'c'}])
    }, 3000);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Basis: {apy.basis}%</h1>
        <h1>Francium: {apy.francium}%</h1>
        <h1>Tulip: {apy.tulip}%</h1>
      </header>
    </div>
  );
}

export default App;
