import shortid from "shortid"

interface IData {
  name: string
  done: boolean
  key: string
}

export class Data implements IData {
  name: string
  done: boolean
  key: string

  constructor(name: string, done: boolean) {
    this.name = name
    this.done = done
    this.key = shortid.generate()
    return {
      name: this.name,
      done: this.done,
      key: this.key,
    }
  }
}
