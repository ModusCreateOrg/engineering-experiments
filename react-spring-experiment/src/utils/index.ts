export const captalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatId = (id: number) => `#${String(id).padStart(3, '0')}`;
