/** @license MIT License (c) copyright 2016 original author or authors */

import { curry2, curry3 } from '@most/prelude'

export * from './dom' // TODO: Move this somewhere else (@most/dom-behavior?)

import * as B from './behavior'
import * as S from './sample'
import * as I from './integral'

export const constant = B.constant
export const map = curry2(B.map)
export const ap = curry2(B.ap)
export const liftA2 = curry3(B.liftA2)
export const liftA3 = B.liftA3 // TODO: Need curry4

export const integral = curry3(I.integral)
export const integralWith = I.integralWith // TODO: Need curry4

export const sample = curry2(S.sample)
export const sampleE = curry3(S.sampleE)
