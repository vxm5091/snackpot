import { useEffect, useRef } from 'react';

type TFunc = () => void;
type TArray = any[];

export const useDidMount = (fn: TFunc): void =>
  useEffect(() => {
    fn();
  }, []);



export const useDidUpdate = (
  fn: TFunc,
  deps: TArray,
): void => {
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      return;
    }
    fn();
  }, deps);
};

export const useWillUnmount = (fn: TFunc): void =>
  useEffect(() => () => fn && fn(), []);
