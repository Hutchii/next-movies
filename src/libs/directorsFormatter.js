export function directorsFormatter(data) {
  const directors = data.map(({ attributes }) => attributes.director);
  return directors.length === 1 ? directors : directors.join(", ");
}
