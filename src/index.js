/** @license MIT License (c) copyright 2016 original author or authors */

import { curry2, curry3 } from '@most/prelude'

export * from './dom'

import * as B from './behavior'

export const constant = B.constant
export const map = curry2(B.map)
export const ap = curry2(B.ap)
export const liftA2 = curry3(B.liftA2)
export const sample = curry2(B.sample)
export const integralWith = B.integralWith
