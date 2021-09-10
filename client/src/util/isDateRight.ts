export const isDateRight = (str: string) => {
  const split = str.split(".");
  if (split.length !== 3) {
    return false;
  }
  const day = Number(split[0]);
  if (isNaN(day)) {
    return false;
  }
  const month = Number(split[1]);
  if (isNaN(month)) {
    return false;
  }
  const year = Number(split[2]);
  if (isNaN(year)) {
    return;
  }

  const date = new Date(year, month - 1, day);
  if (date.getDate() !== day) {
    return false;
  }
  if (date.getMonth() + 1 !== month) {
    return false;
  }
  if (date.getFullYear() !== year) {
    return false;
  }

  return true;
};
