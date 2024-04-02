export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const uncapitalizeFirstLetter = (str: string) =>
  str.charAt(0).toLowerCase() + str.slice(1);

export const jsonParse = <T>(
  value: string,
  validator: (value: unknown) => boolean = () => true
): T | undefined => {
  const validate = (v: unknown): v is T => {
    if (v == null) return false;
    return validator(v);
  };

  try {
    const parse: unknown = JSON.parse(value);
    if (validate(parse)) return parse;
    return undefined;
  } catch {
    return undefined;
  }
};
