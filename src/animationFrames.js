import { Stream } from 'most'
/* global requestAnimationFrame, cancelAnimationFrame */

export default () => new Stream(new AnimationFramesSource())

const recurse = (cancel, schedule) => (sink, scheduler) => {
  let cancel = new Cancel()
  const onNext = x => {
    sink.event(scheduler.now(), x)
    cancel.key = schedule(onNext)
  }
  cancel.key = schedule(onNext)

  return cancel
}

const animationFrames = recurse(cancelAnimationFrame, requestAnimationFrame)

class AnimationFramesSource {
  run (sink, scheduler) {
    return animationFrames(sink, scheduler)
  }
}

class Cancel {
  constructor (key) {
    this.key
  }
  dispose () {
    cancelAnimationFrame(this.key)
  }
}
