export type Option = {
  id: number;
  value: string;
  table: 'securities' | 'positions' | 'both';
  selected: boolean;
  columnname: string;
};

export type FilterRow = {
  variable: Option | null;
  values: string[];
};

export type QueryType = {
  select: Option[];
  groupby: Option[];
  filters: FilterRow[];
};
