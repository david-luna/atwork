/**
 * Helper types
 */
type AnyFunction = (...args: any[]) => any;
// probably unused
interface AnyConstructor {
  new(...args: any[]): any;
}


type Promisified<Type> = Type extends Promise<any> ? Type : Promise<Type>;

type PromisifiedFunction<F extends AnyFunction> = (...args: Parameters<F>) => Promisified<ReturnType<F>>;

// Return type for processed functions
type AtWorkFunctionReturn<T extends AnyFunction> = ReturnType<T> extends Promise<any> ? ReturnType<T> : Promise<ReturnType<T>>;
// Type of the processed functions
type AtWorkFunction<T extends AnyFunction> = (...args: Parameters<T>) => AtWorkFunctionReturn<T>;
// Type of the processed properties
type AtWorkProperty<T> = (val?: T) => Promise<T>;
// Type of the param accepted by the function
export type AtWorkParam = AnyConstructor | AnyFunction | Object;

/**
 * type returned for objects or instances of classes
 * - properties accessible through promisified functions
 * - methods accesible and changed signature using promises to return
 */
export type AtWorkInstance<T> = {
  [K in keyof T]: T[K] extends AnyFunction ? AtWorkFunction<T[K]> : AtWorkProperty<T[K]>;
}

/**
 * type returned for constructor methods
 */
export type AtWorkConstructor<T extends AnyConstructor> = {
  new(ctor: T): AtWorkInstance<InstanceType<T>>;
}

export type AtWorkReturn<T> = T extends AnyConstructor ? AtWorkConstructor<T> :
                              T extends AnyFunction ? AtWorkFunctionReturn<T> :
                              AtWorkInstance<T>;