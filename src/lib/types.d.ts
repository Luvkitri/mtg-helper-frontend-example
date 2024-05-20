export type Card = {
  name: string,
  text: string,
  colorIdentity: string[],
  colors: string[],
  types: string[]
  convertedManaCost: number,
};

export type AutocompleteSuggestion = {
  title: string;
}
