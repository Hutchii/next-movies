export default function Button({ buttonName, toHref, dark }) {
  return (
    <button className={`button ${dark ? "button--dark" : "button--light"}`}>
      {buttonName}
    </button>
  );
}
