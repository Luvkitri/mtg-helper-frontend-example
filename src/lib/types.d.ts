export type Card = {
  uuid: string;
  scryfallId: string;
};

export type AutocompleteSuggestion = {
  title: string;
};

export type PaginationData = {
  total: number;
  page: number;
  pageCount: number;
  limit: number;
  offset: number;
};

export type FilterData = {
  filterColor: boolean;
  filterType: boolean;
};
