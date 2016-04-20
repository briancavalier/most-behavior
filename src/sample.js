/** @license MIT License (c) copyright 2016 original author or authors */

export const sample = (behavior, stream) =>
  stream.timestamp().loop(stepSample, behavior)

const stepSample = (behavior, { time }) => {
  const { value, next } = behavior.runBehavior(time)
  return { seed: next, value }
}

export const sampleE = (f, behavior, stream) =>
  stream.timestamp().loop(stepSampleE, { f, behavior })

const stepSampleE = ({ f, behavior }, { value, time }) => {
  const step = behavior.runBehavior(time)
  return { seed: { f, behavior: step.next }, value: f(step.value, value) }
}
