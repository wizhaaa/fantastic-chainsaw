export type Option = {
  id: number | string;
  value: string;
  table: 'securities' | 'positions';
  selected: boolean;
  columnname: string;
};
