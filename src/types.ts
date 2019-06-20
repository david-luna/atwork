/**
 * Helper types
 */
type AnyFunction = (...args: any[]) => any;
// probably unused
interface AnyConstructor {
  new(...args: any[]): any;
}

// Ensures a type or a return type to be wrapped in a promise
type Promisified<T> = T extends AnyFunction  ? (...args: Parameters<T>) => Promisified<ReturnType<T>> :
                      T extends Promise<any> ? T : Promise<T>;



// // Return type for processed functions
// type AtWorkFunctionReturn<T extends AnyFunction> = ReturnType<T> extends Promise<any> ? ReturnType<T> : Promise<ReturnType<T>>;
// // Type of the processed functions
// type AtWorkFunction<T extends AnyFunction> = (...args: Parameters<T>) => AtWorkFunctionReturn<T>;
// // Type of the processed properties
// type AtWorkProperty<T> = (val?: T) => Promise<T>;
// // Type of the param accepted by the function
// export type AtWorkParam = AnyConstructor | AnyFunction | Object;

// /**
//  * type returned for objects or instances of classes
//  * - properties accessible through promisified functions
//  * - methods accesible and changed signature using promises to return
//  */
// export type AtWorkInstance<T> = {
//   [K in keyof T]: T[K] extends AnyFunction ? AtWorkFunction<T[K]> : AtWorkProperty<T[K]>;
// }

export type AtWorkInstance<T> = {
  [K in keyof T]: T[K] extends AnyFunction ? Promisified<T[K]> : (val?: T[K]) => Promisified<T[K]>;
}

/**
 * type returned for constructor methods
 */
export type AtWorkConstructor<T extends AnyConstructor> = {
  new(ctor: T): AtWorkInstance<InstanceType<T>>;
}

export type AtWorkReturn<T> = T extends AnyConstructor ? AtWorkConstructor<T> :
                              T extends AnyFunction ? Promisified<T> :
                              AtWorkInstance<T>;