import React, { useContext } from "react";
import { useEffect, useReducer } from "react";
import DataContext from "./DataContext/DataContext";

const Balance = () => {
  const reduce = (state, action) => {
    switch (action.type) {
      case "addIncome":
        return { ...state, income: action.payload };
      case "addExpense":
        return { ...state, expense: action.payload };
      case "updateBalance":
        return { ...state, balance: action.payload };
      default:
        throw new Error();
    }
  };

  const ACTION = {
    ADDINCOME: "addIncome",
    ADDEXPENSE: "addExpense",
    UPDATEBALANCE: "updateBalance",
  };

  const [state, dispatch] = useReducer(reduce, {
    income: 0,
    expense: 0,
    balance: 0,
  });
  const { transactions } = useContext(DataContext);

  useEffect(() => {
    let incomeTol = 0;
    let expenseTol = 0;

    transactions.map((transaction) => {
      const newAmount = Number(transaction.amount);

      if (newAmount > 0) {
        incomeTol = incomeTol + newAmount;
      } else {
        expenseTol = expenseTol - newAmount;
      }
    });

    dispatch({ type: ACTION.ADDINCOME, payload: incomeTol });
    dispatch({ type: ACTION.ADDEXPENSE, payload: expenseTol });
    dispatch({ type: ACTION.UPDATEBALANCE, payload: incomeTol - expenseTol });
  }, [transactions]);

  return (
    <div className="Balance">
      <div className="yourBalance">
        <h2>YOUR BALANCE</h2>
        <p>
          <span>&#163;{state.balance.toFixed(2)}</span>
        </p>
      </div>
      <div className="InAndOut">
        <div className="Income">
          <h3>INCOME</h3>
          <p style={{ color: "green" }}>
            <span>&#163;{state.income.toFixed(2)}</span>
          </p>
        </div>
        <div className="Expense">
          <h3>EXPENSE</h3>
          <p style={{ color: "red" }}>
            <span>&#163;</span>
            {state.expense.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
