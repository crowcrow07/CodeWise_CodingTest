function isNullOrEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    value === "<p></p>\n"
  );
}

export function validateData(data) {
  const errors = {};

  Object.keys(data).forEach((key) => {
    if (isNullOrEmpty(data[key])) {
      errors[key] = `${key} 칸을 작성해주세요.`;
    }
  });

  return errors;
}
