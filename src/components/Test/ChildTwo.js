import { useState } from "react";

export default function Child2(props) {
  function add() {
    props.onSaveExpenseData({jeden: 1});
  }

  return <div onClick={add}>{`Child2`}</div>;
}
