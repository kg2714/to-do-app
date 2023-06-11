import { Data } from "../Data"

export const getIndexOfData = (i: Array<Data>, s: Data): number => {
  var p = -1
  for (var l = 0; l <= i.length; l++) {
    if (s === i[l]) {
      p = l
      break
    }
  }
  return p
}

export const getIndexOfDataKey = (i: Array<Data>, s: string): number => {
  var p = -1
  for (var l = 0; l <= i.length; l++) {
    if (s === i[l].key) {
      p = l
      break
    }
  }
  return p
}
