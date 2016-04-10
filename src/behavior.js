/** @license MIT License (c) copyright 2016 original author or authors */

import { curry2, curry3 } from '@most/prelude'

export const constant = x => new Constant(x)

class Constant {
  constructor (x) {
    this._value = x
  }

  value (t) {
    return this._value
  }
}

export const map = curry2((f, behavior) => new Map(f, behavior))

class Map {
  constructor (f, behavior) {
    this.f = f
    this.behavior = behavior
  }

  value (t) {
    const f = this.f
    return f(this.behavior.value(t))
  }
}

export const liftA2 = curry3((f, b1, b2) => new LiftA2(f, b1, b2))
export const ap = curry2((bf, bx) => new LiftA2(apply, bf, bx))
const apply = (f, x) => f(x)

class LiftA2 {
  constructor (f, b1, b2) {
    this.f = f
    this.behavior1 = b1
    this.behavior2 = b2
  }

  value (t) {
    const f = this.f
    return f(this.behavior1.value(t), this.behavior2.value(t))
  }
}

export const sample = curry2((behavior, stream) =>
  stream.loop(stepSample, behavior))

const stepSample = (behavior, { time, value }) =>
  ({ seed: behavior, value: behavior.value(time) })
