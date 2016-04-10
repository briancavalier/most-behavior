import { inputValue } from '../../src/dom'
import { input } from '@most/dom-event'
import { liftA2, map, sample } from '../../src/behavior'

const byId = id => document.getElementById(id)
const add = (x, y) => x + y

const addInputs = (elx, ely, container) => {
  const x = map(Number, inputValue(elx))
  const y = map(Number, inputValue(ely))
  const z = liftA2(add, x, y)

  const inputEvents = input(container)

  return sample(z, inputEvents)
}

const elz = byId('z')
const render = result => { elz.value = result }

addInputs(byId('x'), byId('y'), byId('container'))
  .observe(render)
