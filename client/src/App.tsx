import React, { useEffect, useState } from "react";
import Farmer from "./components/Farmer";
import basisLogo from "./images/basis-logo.png";
import franciumLogo from "./images/francium-logo.png";
import tulipLogo from "./images/tulip-logo.svg";
import "./App.css";

interface test {
  basis: number;
  francium: number;
  tulip: number;
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
    }, 6000);
  };
  return (
    <div className="App">
      <main className="container">
        <Farmer title="Basis" farmerLogo={basisLogo} farmerAPY={apy.basis} />
        <Farmer
          title="Francium"
          farmerLogo={franciumLogo}
          farmerAPY={apy.francium}
          middleEl={true}
        />
        <Farmer title="Tulip" farmerLogo={tulipLogo} farmerAPY={apy.tulip} />
      </main>
    </div>
  );
}

export default App;
