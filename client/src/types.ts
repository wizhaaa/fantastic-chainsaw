export type Option = {
  id: number;
  value: string;
  table: 'securities' | 'positions' | 'both';
  selected: boolean;
  columnname: string;
};
