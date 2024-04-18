import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("expense-tracker")) || [];
    setTransactions(storedTransactions);
  }, []);
  return (
    <DataContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
