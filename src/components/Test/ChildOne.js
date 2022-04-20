import Child2 from "./ChildTwo";

export default function Child1(props) {
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
  };

  return (
    <>
      <Child2 onSaveExpenseData={saveExpenseDataHandler} />
      <div>Child1</div>
    </>
  );
}
