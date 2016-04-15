/** @license MIT License (c) copyright 2016 original author or authors */

export const constant = x => new Constant(x)

class Constant {
  constructor (value) {
    this.value = value
  }

  next (t) {
    return this
  }
}

export const map = (f, behavior) => new Map(f(behavior.value), f, behavior)

class Map {
  constructor (value, f, behavior) {
    this.value = value
    this.f = f
    this.behavior = behavior
  }

  next (t) {
    return map(this.f, this.behavior.next(t))
  }
}

export const liftA2 = (f, b1, b2) => new LiftA2(f(b1.value, b2.value), f, b1, b2)
export const ap = (bf, bx) => liftA2(apply, bf, bx)

class LiftA2 {
  constructor (value, f, b1, b2) {
    this.value = value
    this.f = f
    this.b1 = b1
    this.b2 = b2
  }

  next (t) {
    return liftA2(this.f, this.b1.next(t), this.b2.next(t))
  }
}

export const integralWith = (f, w, a, behavior) => runIntegralWith(f, w, a, behavior, 0)
const runIntegralWith = (f, w, a, behavior, t) => new Integral(a, f, w, behavior, t)

class Integral {
  constructor (value, f, w, behavior, t0) {
    this.value = value
    this.f = f
    this.w = w
    this.behavior = behavior
    this.t0 = t0
  }

  next (t) {
    const wn = this.w.next(t)
    const bn = this.behavior.next(t)
    const f = this.f
    const value = f(wn.value, this.value, bn.value, t - this.t0)
    return runIntegralWith(f, wn, value, bn, t)
  }
}

export const sample = (behavior, stream) =>
  stream.timestamp().scan(stepSample, behavior).map(toValue)

const stepSample = (behavior, { time }) => behavior.next(time)
const toValue = ({ value }) => value

const apply = (f, x) => f(x)
