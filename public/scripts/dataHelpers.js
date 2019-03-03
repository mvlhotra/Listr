function titleCaseString(stringInput) {
  const normalizedArray = stringInput.toLowerCase().split(' ');
  const titleCaseArray = [];
  normalizedArray.forEach((word) => {
    titleCaseArray.push(`${word.charAt(0).toUpperCase()}${word.slice(1, word.length)}`);
  });
  return titleCaseArray.join(' ');
}
