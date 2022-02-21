export default function ButtonArrow({ prev, hoverHandler, onClickHandler }) {
  return (
    <button
      className={`title-home--arrow ${
        prev ? "title-home--arrow-prev" : "title-home--arrow-next"
      } ${hoverHandler ? "title-home--arrow-active" : ""}`}
      onClick={onClickHandler}
    />
  );
}
