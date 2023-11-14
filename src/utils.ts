export  const numberToLetter = (number: number) => {
  let letter;

  switch (number) {
    case 0:
      letter = "A";
      break;
    case 1:
      letter = "B";
      break;
    case 2:
      letter = "C";
      break;
    case 3:
      letter = "D";
      break;
    default:
      letter = "E";
      break;
  }
  return letter;
};