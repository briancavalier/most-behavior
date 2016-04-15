import { liftA2, map, sample, inputValue } from '../../src/index'
import { input } from '@most/dom-event'
import { compose } from '@most/prelude'

// Display the result of adding two inputs.
// The result is reactive and updates whenever *either* input changes.

const container = document.querySelector('.container')
const xInput = document.querySelector('.x')
const yInput = document.querySelector('.y')
const resultNode = document.querySelector('.result')

const renderResult = result => { resultNode.textContent = result }

const numberValue = compose(map(Number), inputValue)
const add = liftA2((x, y) => x + y)

// x represents the current value of xInput as a number
const x = numberValue(xInput)

// x represents the current value of yInput as a number
const y = numberValue(yInput)

// result is always the value of adding x and y
const result = add(x, y)

// Observe the result value by rendering it to the resultNode
sample(result, input(container)).observe(renderResult)
