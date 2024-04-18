import Header from "./Header";
import Balance from "./Balance";
import History from "./History";
import Transaction from "./Transaction";
import { useContext, useState } from "react";
import { DataProvider } from "./DataContext/DataContext";

function App() {
  return (
    <div className="App">
      <Header />
      <DataProvider>
        <Balance />
        <History />
        <Transaction />
      </DataProvider>
    </div>
  );
}

export default App;
