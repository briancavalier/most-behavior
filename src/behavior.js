/** @license MIT License (c) copyright 2016 original author or authors */
// Conceptually:
// type Behavior t a = t -> (a, Behavior t a)

// constant :: a -> Behavior t a
export const constant = x => new Constant(x)

// map :: (a -> b) -> Behavior t a -> Behavior t b
export const map = (f, s) => s.map(f)

// liftA2 :: (a -> b -> c) -> Behavior t a -> Behavior t b -> Behavior t c
export const liftA2 = (f, s1, s2) => s1.liftA2(f, s2)

// ap :: Behavior t (a -> b) -> Behavior t a -> Behavior t b
export const ap = (bf, ba) => liftA2(apply, bf, ba)

// liftA3 :: (a -> b -> c -> d) -> Behavior t a -> Behavior t b -> Behavior t c -> Behavior t d
export const liftA3 = (f, s1, s2, s3) => s1.liftA3(f, s2, s3)

// A time-varying value
export class Behavior {
  constructor (runBehavior) {
    this._runBehavior = runBehavior
    this._value = void 0
  }

  runBehavior (t) {
    return this._value === void 0
      ? this._value = this._runBehavior(t) : this._value
  }

  map (f) {
    return new Behavior(t => mapB(f, this.runBehavior(t)))
  }

  ap (xs) {
    return this.liftA2(apply, xs)
  }

  liftA2 (f, b) {
    return new Behavior(t => liftA2B(f, this.runBehavior(t), b.runBehavior(t)))
  }

  liftA3 (f, b, c) {
    return new Behavior(t => liftA3B(f, this.runBehavior(t), b.runBehavior(t), c.runBehavior(t)))
  }
}

// A Behavior whose value doesn't vary
class Constant {
  constructor (x) {
    this.value = x
    this.next = this
  }

  runBehavior (t) {
    return this
  }

  map (f) {
    return new Behavior(t => mapB(f, this))
  }

  ap (xs) {
    return xs.map(this.value)
  }

  liftA2 (f, b) {
    return b.map(b => f(this.value, b))
  }

  liftA3 (f, b, c) {
    return b.liftA2((b, c) => f(this.value, b, c), c)
  }
}

export class Step {
  constructor (value, next) {
    this.value = value
    this.next = next
  }
}

// Internal helpers
const mapB = (f, { value, next }) => new Step(f(value), next.map(f))

const liftA2B = (f, { value: v1, next: n1 }, { value: v2, next: n2 }) =>
  new Step(f(v1, v2), liftA2(f, n1, n2))

const apply = (f, x) => f(x)

const liftA3B = (f, { value: v1, next: n1 }, { value: v2, next: n2 }, { value: v3, next: n3 }) =>
  new Step(f(v1, v2, v3), liftA3(f, n1, n2, n3))
