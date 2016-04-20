/** @license MIT License (c) copyright 2016 original author or authors */

import { Behavior, Step } from './behavior'

// Euler integration
// integral :: (a -> b -> dt -> a) -> a -> Behavior t b -> Behavior t a
export const integral = (f, a, s) =>
  new Behavior(t => new Step(a, runIntegral(f, a, s, t)))

const runIntegral = (f, a0, s, t0) =>
  new Behavior(t => step(f, a0, s.runBehavior(t), t, t0))

const step = (f, a0, sv, t, t0) => {
  const a = f(a0, sv.value, t - t0)
  return new Step(a, runIntegral(f, a, sv.next, t))
}

// Euler integration with extra reference data w
// integralWith :: (w -> a -> b -> dt -> a) -> a -> Behavior t w -> Behavior t b -> Behavior t a
export const integralWith = (f, w, a, s) =>
  new Behavior(t => new Step(a, runIntegralWith(f, w, a, s, t)))

const runIntegralWith = (f, w, a0, s, t0) =>
  new Behavior(t => stepWith(f, w.runBehavior(t), a0, s.runBehavior(t), t, t0))

const stepWith = (f, w, a0, sv, t, t0) => {
  const a = f(w.value, a0, sv.value, t - t0)
  return new Step(a, runIntegralWith(f, w.next, a, sv.next, t))
}
