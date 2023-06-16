import { Data } from "./DataInterface"

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
