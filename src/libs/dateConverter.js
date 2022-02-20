export function dateConverter(date) {
  const dateParts = date.split("T")[0].split("-");

  function monthConverter(month) {
    const months = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[+month];
  }

  const month = monthConverter(dateParts[1]);
  const day = dateParts[2].startsWith("0")
    ? dateParts[2].slice(1)
    : dateParts[2];

  return `${month} ${day}, ${dateParts[0]}`;
}
