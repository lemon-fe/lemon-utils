import BaseLib from './baselib/index.js'
import DateLib from './datelib/index.js'
import FigureLib from './figurelib/index.js'
import StorageLib from './storagelib/index.js'

export default {
  ...BaseLib,
  ...DateLib,
  ...FigureLib,
  ...StorageLib
}