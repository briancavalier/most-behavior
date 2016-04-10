import { constant, map } from './behavior'

export const inputValue = input => map(getValue, constant(input))

const getValue = input => input.value
