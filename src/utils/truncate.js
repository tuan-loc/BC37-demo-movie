export const truncateString = (str, number) => {
  if (str.length > number) {
    return str.substr(0, number) + "...";
  } else {
    return str;
  }
};
