import { useState } from "react";
import Child1 from "../components/Test/ChildOne";

export default function React() {
  const [expenses, setExpenses] = useState([{ dwa: 2 }]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };
  console.log(expenses);
  return (
    <>
      <Child1 onAddExpense={addExpenseHandler} />
      <div>Parent</div>
    </>
  );
}
