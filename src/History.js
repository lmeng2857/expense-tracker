import React, { useContext } from "react";
import DataContext from "./DataContext/DataContext";
import Logo from "./assets/delete.svg";

const History = () => {
  const { transactions, setTransactions } = useContext(DataContext);

  const handleDelete = (id) => {
    const updateTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updateTransactions);
    localStorage.setItem("expense-tracker", JSON.stringify(updateTransactions));
    console.log(updateTransactions.length);
  };

  const newTransactions = [...transactions].reverse();

  // console.log(newTransactions);
  return (
    <div className="History">
      <h2>History</h2>
      {transactions.length > 0 ? (
        <ul>
          {newTransactions.map((transaction) => (
            <li key={transaction.id} style={{ listStyleType: "none" }}>
              <img
                src={Logo}
                alt="delete logo"
                width="15px"
                height="auto"
                onClick={() => handleDelete(transaction.id)}
              />
              <span className={transaction.amount > 0 ? "green" : "red"}>
                <p className="Text">{transaction.text}</p>
                <p className="Amount">
                  {transaction.amount > 0
                    ? `+${transaction.amount}`
                    : transaction.amount}
                </p>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nothing here</p>
      )}
    </div>
  );
};

export default History;
