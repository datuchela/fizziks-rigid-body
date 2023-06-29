export const scientificNotation = (value: number) => {
  const formattedValue = Intl.NumberFormat("en-US", {
    notation: "scientific",
  }).format(value);

  const [base, exponent] = formattedValue.split("E");
  return `${base} * 10^${exponent}`;
};
