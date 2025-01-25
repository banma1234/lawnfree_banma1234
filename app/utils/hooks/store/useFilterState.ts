import { create } from "zustand";

interface FilterState {
  option: string;
  changeOption: (selectedOption: string) => void;
}

const useFilterStore = create<FilterState>(set => ({
  option: "STANDARD",

  changeOption: (selectedOption: string) => {
    set({ option: selectedOption });
  },
}));

export const useFilterState = () => useFilterStore(state => state.option);
export const useFilterStateChange = () =>
  useFilterStore(state => state.changeOption);
