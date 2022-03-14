import { useState } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { createContext } from "react";
import { SectionDataItem } from "../components/Section";

interface Chart {
  count: number;
  chartItems: SectionDataItem[];
  addItemToChart: (item: SectionDataItem) => void;
}

const ChartContext = createContext({} as Chart);

export const useChart = () => useContext(ChartContext);

export const ChartProvider = ({ children }) => {
  const [chartItems, setChartItems] = useState<SectionDataItem[]>([]);

  const count = useMemo(() => chartItems.length, [chartItems]);

  const addItemToChart = (item: SectionDataItem) => {
    if (chartItems.find((cI) => cI.id === item.id)) return;
    setChartItems((prev) => [...prev, item])
  };

  return (
    <ChartContext.Provider value={{
      count,
      chartItems,
      addItemToChart
    }}>{children}</ChartContext.Provider>
  );
};
