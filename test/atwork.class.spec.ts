import { atwork } from '../src/atwork';
import { AtWorkReturn } from '../src/types';

class TestClass {
  // Test defined properties
  directProp: string = 'directTest';

  // Test props with setters & getters
  private _getSetProp : string = 'getSetTest';
  public get getSetProp() : string {
    return this._getSetProp;
  }
  public set getSetProp(v : string) {
    this._getSetProp = v;
  }
  
  // Test injected properties
  constructor(public injectedProp: string) {}

  // Test methods
  testMethod(testParam: number): number { return testParam + 10; }
}

interface TestClassConstructor {
  new(injectedProp: string): TestClass
}

let atWorkInstance: AtWorkReturn<TestClass> = {
  directProp: (param: string) => Promise.resolve('a'),
  getSetProp: (param: string) => Promise.resolve('a'),
  injectedProp:  (param: string) => Promise.resolve('a'),
  testMethod: (param: number) => Promise.resolve(10),
}

let atWorkConstructor: AtWorkReturn<TestClassConstructor> = () => atWorkInstance;


test('sould do something', () => {
  expect(atwork({})).toBe('test2');
  expect(atwork({})).toBe('test3');
});