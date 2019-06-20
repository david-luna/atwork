/**
 * This class receives any other reference via consttuctor
 * - there is no references to external imports
 * - dependencies are set via constructor
 */
export class ClassWithDependencies {
  private accumulated: number;
  private dependency : ClassDependency;

  constructor (
    acc: number,
    dep: ClassDependency
  ) {
    this.accumulated = acc;
    this.dependency  = dep;
  }

  result (): number {
    return this.dependency.apply(this.accumulated);
  }
}

export class ClassDependency {
  apply ( num: number ): number {
    return num + 2;
  }
}
