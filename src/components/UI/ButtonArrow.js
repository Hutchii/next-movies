export default function ButtonArrow({ prev, onClickHandler }) {
  return (
    <button
      className={`title-home--arrow ${
        prev ? "title-home--arrow-prev" : "title-home--arrow-next"
      }`}
      onClick={onClickHandler}
    />
  );
}
