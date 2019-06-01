import {
  AtWorkReturn,
} from './types';


export function atwork<T>(param: T): AtWorkReturn<T> {
  // return () => Promise.resolve(param);
  return {} as AtWorkReturn<T>;
}