import { useRef, useEffect } from "react";

const usePrevious = (value: any) => {
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;
