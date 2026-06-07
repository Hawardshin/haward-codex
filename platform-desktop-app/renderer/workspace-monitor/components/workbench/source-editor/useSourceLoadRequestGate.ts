import { useCallback, useRef } from "react";

export type SourceLoadRequestGate = () => boolean;

export function useSourceLoadRequestGate() {
  const requestSeqRef = useRef(0);

  const beginSourceLoadRequest = useCallback((): SourceLoadRequestGate => {
    const requestSeq = requestSeqRef.current + 1;
    requestSeqRef.current = requestSeq;
    return () => requestSeqRef.current === requestSeq;
  }, []);

  const cancelPendingSourceLoad = useCallback(() => {
    requestSeqRef.current += 1;
  }, []);

  return {
    beginSourceLoadRequest,
    cancelPendingSourceLoad
  };
}
