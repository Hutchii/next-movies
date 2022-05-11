export default function Child({ change }) {
  return (
    <div>
      <p>{change ? "true" : "false"}</p>
    </div>
  );
}
