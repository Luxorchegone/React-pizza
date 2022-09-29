export interface SortProps {
  descSort: boolean;
  setDescSort: (descSort: boolean) => void;
  sortType: { name: string; sortProperty: string };
  setSortType: (sortType: { name: string; sortProperty: string }) => void;
}
