export default function Button({ buttonName, dark }) {
  return (
    <button className={`button ${dark ? "button--dark" : "button--light"}`}>
      {buttonName}
    </button>
  );
}
