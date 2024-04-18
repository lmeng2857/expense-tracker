import React from "react";
import { useContext, useReducer } from "react";
import DataContext from "./DataContext/DataContext";

const Transaction = () => {
  const reduce = (state, action) => {
    switch (action.type) {
      case "inputText":
        return { ...state, inputText: action.payload };
      case "inputAmount":
        return { ...state, inputAmount: action.payload };
      default:
        throw new Error();
    }
  };

  const ACTION = {
    INPUTTEXT: "inputText",
    INPUTAMOUNT: "inputAmount",
  };
  const { transactions, setTransactions } = useContext(DataContext);

  const [state, dispatch] = useReducer(reduce, {
    inputText: "",
    inputAmount: "",
  });

  const id =
    transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      text:
        state.inputText[0].toUpperCase() +
        state.inputText.slice(1).toLowerCase(),
      amount: state.inputAmount,
      id,
    };
    console.log(JSON.stringify(newTransaction));

    setTransactions([...transactions, newTransaction]);
    localStorage.setItem(
      "expense-tracker",
      JSON.stringify([...transactions, newTransaction])
    );

    dispatch({ type: ACTION.INPUTTEXT, payload: "" });

    dispatch({ type: ACTION.INPUTAMOUNT, payload: "" });
  };
  return (
    <div className="Transaction">
      <h2>Add new Transaction</h2>
      <form className="transactionForm" onSubmit={handleSubmit}>
        <label htmlFor="transaction_text">Text</label>
        <input
          type="text"
          id="transaction_text"
          value={state.inputText}
          placeholder="Enter Text..."
          required
          onChange={(e) =>
            dispatch({ type: ACTION.INPUTTEXT, payload: e.target.value })
          }
        />
        <label htmlFor="transaction_amount">
          Amount <br /> (negative - expense, postive - income)
        </label>
        <input
          type="number"
          step=".01"
          id="transaction_amount"
          required
          value={state.inputAmount}
          placeholder="Enter amount..."
          onChange={(e) =>
            dispatch({ type: ACTION.INPUTAMOUNT, payload: e.target.value })
          }
        />
        <button type="submit">Add transaction</button>
      </form>
    </div>
  );
};

export default Transaction;
