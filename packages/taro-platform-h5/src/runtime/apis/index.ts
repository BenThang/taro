import { isMatchWith, set } from 'lodash-es'

import Taro from './taro'

import type TDefinition from '@tarojs/plugin-platform-h5/dist/definition.json'

export * from './taro'
export * from './taro-h5'

const definition = require('@tarojs/plugin-platform-h5/dist/definition.json') as typeof TDefinition

let list: Record<string, unknown> | null = null
export function canIUse (scheme = '') {
  /** Note: 此处方法仅作适配使用，用于避免 babel 无法识别的情况，比如通过变量传递的 scheme 等等
   * 同时，此处的 scheme 不包括在编译时写入的 hooks 等方法，故而不支持相关判断
   */
  if (list === null) {
    list = {
      ...definition.apis,
      ...definition.components,
      canIUse: '*'
    } as Exclude<typeof list, null>
  }
  if (!scheme) return false
  const o = set({}, scheme, true)
  return isMatchWith(list, o, (a, _) => {
    if (a === '*') return true
  })
}

export default Taro
