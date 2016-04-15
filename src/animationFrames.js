import { Stream } from 'most'
/* global requestAnimationFrame, cancelAnimationFrame */

export default () => new Stream(new AnimationFramesSource())

const recurse = (cancel, schedule) => (sink, scheduler) => {
  let canceler = new Cancel(cancel)
  const onNext = x => {
    sink.event(scheduler.now(), x)
    cancel.key = schedule(onNext)
  }
  cancel.key = schedule(onNext)

  return canceler
}

const animationFrames = recurse(cancelAnimationFrame, requestAnimationFrame)

class AnimationFramesSource {
  run (sink, scheduler) {
    return animationFrames(sink, scheduler)
  }
}

class Cancel {
  constructor (cancel) {
    this.cancel = cancel
    this.key = undefined
  }
  dispose () {
    this.cancel(this.key)
  }
}
