import { useMemo } from "react";
import { useResources } from "./useResources"

export const useInit = () => {
  const { isFontLoading } = useResources();

  const isReady = useMemo(() => isFontLoading, [isFontLoading]);

  return {
    isReady
  }
}