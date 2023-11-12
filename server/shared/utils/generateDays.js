function range(start, size) {
  return [...Array(size).keys()].map((i) => i + start);
}

function generateDays(year, month) {
  const numberOfDays = new Date(year, month, 0).getDate();
  const rangeDays = range(1, numberOfDays);
  return rangeDays.map((i) => {
    return {day: `${year} ${month} ${i}`}
  });
}

module.exports = { generateDays };
